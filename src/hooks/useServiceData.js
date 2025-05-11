
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
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
    try {
      // Query for services based on active tab
      const serviceStatus = activeTab === 'antrian' ? 'pending' : 'in-progress';
      
      const servicesQuery = query(
        collection(db, 'services'),
        where('status', '==', serviceStatus)
      );
      
      const unsubscribe = onSnapshot(servicesQuery, (snapshot) => {
        if (snapshot.empty) {
          console.log('No services found in Firebase. Using mock data instead.');
          // Use mock data when Firebase collection is empty
          provideMockData();
        } else {
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
        }
      }, (err) => {
        console.error("Firebase error:", err);
        toast.error("Failed to load data from Firebase");
        setError(err.message);
        provideMockData();
      });
      
      return () => unsubscribe();
      
    } catch (err) {
      console.error('Error setting up Firebase listener: ', err);
      setError(err.message);
      provideMockData();
    }
  }, [activeTab]);
  
  // Function to provide mock data when Firebase fails or is empty
  const provideMockData = () => {
    const mockServices = [
      { 
        id: 'A001', 
        type: 'Service Umum', 
        vehicle: 'B 1234 XYZ - Beat',
        customer: 'Ahmad',
        estimate: '45',
        status: 'In Progress' 
      },
      { 
        id: 'C002', 
        type: 'Cuci Steam', 
        vehicle: 'AD 3344 HIJ - PCX',
        customer: 'Budi', 
        estimate: '30',
        status: 'In Progress' 
      },
      { 
        id: 'G002', 
        type: 'Ganti Oli', 
        vehicle: 'B 2345 STU - Lexi',
        customer: 'Charlie',
        estimate: '20',
        status: 'In Progress' 
      },
      { 
        id: 'S001', 
        type: 'Service Berat', 
        vehicle: 'B 7788 JKL - Vario',
        customer: 'Diana',
        estimate: '120',
        status: 'In Progress' 
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
