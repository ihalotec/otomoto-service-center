
import { useState, useEffect } from 'react';
import { FirestoreService } from '../services/FirestoreService';
import { toast } from '@/components/ui/sonner';

export const useServiceData = () => {
  const [serviceStats, setServiceStats] = useState({
    serviceUmum: { current: 0, max: 10 },
    cuciSteam: { current: 0, max: 15 },
    gantiOli: { current: 0, max: 5 },
    serviceBerat: { current: 0, max: 3 }
  });
  
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('antrian');
  
  useEffect(() => {
    // Seed initial data if needed
    try {
      FirestoreService.seedInitialData();
    } catch (err) {
      console.error("Error seeding initial data:", err);
      // Don't set error state here as this is just initialization
    }
  }, []);
  
  useEffect(() => {
    setLoading(true);
    let unsubscribe = null;
    
    try {
      // Map activeTab values to Firestore status values
      const serviceStatus = activeTab === 'antrian' ? 'waiting' : 
                           (activeTab === 'dikerjakan' ? 'in-progress' : 'completed');
      
      // Set up listener for services based on active tab
      unsubscribe = FirestoreService.listenToServicesByStatus(serviceStatus, (servicesData) => {
        // Ensure servicesData is an array
        const dataArray = Array.isArray(servicesData) ? servicesData : [];
        
        if (dataArray.length === 0) {
          console.log(`No services found with status: ${serviceStatus}. Using mock data.`);
          setServices([]);
        } else {
          // Validate each service object has the required properties
          const validServices = dataArray.map(service => ({
            id: service.id || 'unknown-id',
            type: service.type || 'Unknown',
            vehicle: service.vehicle || { plate: 'Unknown', model: 'Unknown', type: 'Unknown' },
            customer: service.customer || { name: 'Unknown', phone: 'Unknown' },
            estimate: service.estimate || { duration: 'Unknown', completionTime: 'Unknown' },
            status: service.status || serviceStatus,
          }));
          
          setServices(validServices);
          console.log(`Loaded ${validServices.length} services with status: ${serviceStatus}`);
        }
        
        // Update service statistics by querying all services
        calculateServiceStats();
        setLoading(false);
        setError(null);
      });
      
    } catch (err) {
      console.error('Error setting up Firebase listener: ', err);
      setError(err.message || "Error loading data");
      setLoading(false);
      toast.error("Failed to load data from Firebase");
    }
    
    return () => {
      // Clean up subscription when component unmounts or status changes
      if (unsubscribe) unsubscribe();
    };
  }, [activeTab]);
  
  // Calculate service statistics from Firestore
  const calculateServiceStats = async () => {
    try {
      // Get counts for each service type
      const queryPromises = [
        FirestoreService.listenToServicesByStatus('waiting', (data) => {
          if (Array.isArray(data)) {
            updateStatsForService(data);
          }
        }),
        FirestoreService.listenToServicesByStatus('in-progress', (data) => {
          if (Array.isArray(data)) {
            updateStatsForService(data);
          }
        })
      ];
      
      return queryPromises;
    } catch (error) {
      console.error("Error calculating service stats: ", error);
      toast.error("Failed to calculate service statistics");
    }
  };
  
  const updateStatsForService = (servicesData) => {
    if (!Array.isArray(servicesData)) {
      console.error("Expected array for servicesData, got", typeof servicesData);
      return;
    }
    
    // Calculate statistics
    const stats = {
      serviceUmum: { current: 0, max: 10 },
      cuciSteam: { current: 0, max: 15 },
      gantiOli: { current: 0, max: 5 },
      serviceBerat: { current: 0, max: 3 }
    };
    
    servicesData.forEach(service => {
      if (!service || typeof service !== 'object') return;
      
      const serviceType = service.type;
      if (serviceType === 'Service Umum') stats.serviceUmum.current++;
      else if (serviceType === 'Cuci Steam') stats.cuciSteam.current++;
      else if (serviceType === 'Ganti Oli') stats.gantiOli.current++;
      else if (serviceType === 'Service Berat') stats.serviceBerat.current++;
    });
    
    setServiceStats(prevStats => ({
      serviceUmum: { ...prevStats.serviceUmum, current: stats.serviceUmum.current },
      cuciSteam: { ...prevStats.cuciSteam, current: stats.cuciSteam.current },
      gantiOli: { ...prevStats.gantiOli, current: stats.gantiOli.current },
      serviceBerat: { ...prevStats.serviceBerat, current: stats.serviceBerat.current },
    }));
  };
  
  return {
    serviceStats,
    services,
    loading,
    error,
    activeTab,
    setActiveTab
  };
};
