
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
    try {
      // Query for services based on active tab
      const serviceStatus = activeTab === 'antrian' ? 'pending' : 'in-progress';
      
      const servicesQuery = query(
        collection(db, 'services'),
        where('status', '==', serviceStatus)
      );
      
      const unsubscribe = onSnapshot(servicesQuery, (snapshot) => {
        const servicesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setServices(servicesData);
        
        // Calculate service statistics
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
        
        setServiceStats(stats);
        setLoading(false);
      });
      
      return () => unsubscribe();
    } catch (err) {
      console.error('Error fetching services: ', err);
      setError(err.message);
      setLoading(false);
    }
  }, [activeTab]);
  
  // Mock data for demo purposes when Firebase is not set up yet
  useEffect(() => {
    if (loading && !services.length) {
      const mockServices = [
        { 
          id: 'A001', 
          type: 'Service Umum', 
          vehicle: 'B 1234 XYZ - Beat',
          customer: 'Ahmad',
          estimate: '5',
          status: 'In Progress' 
        },
        { 
          id: 'C002', 
          type: 'Cuci Steam', 
          vehicle: 'AD 3344 HIJ - PCX',
          customer: 'Budi', 
          estimate: '8',
          status: 'In Progress' 
        },
        { 
          id: 'G002', 
          type: 'Ganti Oli', 
          vehicle: 'B 2345 STU - Lexi',
          customer: 'Charlie',
          estimate: '10',
          status: 'In Progress' 
        },
        { 
          id: 'C006', 
          type: 'Cuci Steam', 
          vehicle: 'AG 1234 TUV - Revo',
          customer: 'Diana',
          estimate: '5',
          status: 'Completed' 
        }
      ];
      
      const stats = {
        serviceUmum: { current: 3, max: 10 },
        cuciSteam: { current: 6, max: 15 },
        gantiOli: { current: 2, max: 5 },
        serviceBerat: { current: 1, max: 3 }
      };
      
      setServices(mockServices);
      setServiceStats(stats);
      setLoading(false);
    }
  }, [loading, services.length]);
  
  return {
    serviceStats,
    services,
    loading,
    error,
    activeTab,
    setActiveTab
  };
};
