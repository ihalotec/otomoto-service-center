
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
    FirestoreService.seedInitialData();
  }, []);
  
  useEffect(() => {
    setLoading(true);
    
    try {
      // Map activeTab values to Firestore status values
      const serviceStatus = activeTab === 'antrian' ? 'waiting' : 
                           (activeTab === 'dikerjakan' ? 'in-progress' : 'completed');
      
      // Set up listener for services based on active tab
      const unsubscribe = FirestoreService.listenToServicesByStatus(serviceStatus, (servicesData) => {
        if (servicesData.length === 0) {
          console.log(`No services found with status: ${serviceStatus}. Using mock data.`);
          // This will either show empty state or could use mock data
          setServices([]);
        } else {
          setServices(servicesData);
          console.log(`Loaded ${servicesData.length} services with status: ${serviceStatus}`);
        }
        
        // Update service statistics by querying all services
        calculateServiceStats();
        setLoading(false);
      });
      
      return () => {
        // Clean up subscription when component unmounts or status changes
        if (unsubscribe) unsubscribe();
      };
      
    } catch (err) {
      console.error('Error setting up Firebase listener: ', err);
      setError(err.message);
      setLoading(false);
      toast.error("Failed to load data from Firebase");
    }
  }, [activeTab]);
  
  // Calculate service statistics from Firestore
  const calculateServiceStats = async () => {
    try {
      // Get counts for each service type
      const queryPromises = [
        FirestoreService.listenToServicesByStatus('waiting', (data) => {
          updateStatsForService(data);
        }),
        FirestoreService.listenToServicesByStatus('in-progress', (data) => {
          updateStatsForService(data);
        })
      ];
      
      return queryPromises;
    } catch (error) {
      console.error("Error calculating service stats: ", error);
      toast.error("Failed to calculate service statistics");
    }
  };
  
  const updateStatsForService = (servicesData) => {
    // Calculate statistics
    const stats = {
      serviceUmum: { current: 0, max: 10 },
      cuciSteam: { current: 0, max: 15 },
      gantiOli: { current: 0, max: 5 },
      serviceBerat: { current: 0, max: 3 }
    };
    
    servicesData.forEach(service => {
      if (service.type === 'Service Umum') stats.serviceUmum.current++;
      else if (service.type === 'Cuci Steam') stats.cuciSteam.current++;
      else if (service.type === 'Ganti Oli') stats.gantiOli.current++;
      else if (service.type === 'Service Berat') stats.serviceBerat.current++;
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
