
import React from 'react';
import CircularProgress from '../../components/CircularProgress';
import ServiceCard from '../../components/ServiceCard';
import { useServiceData } from '../../hooks/useServiceData';

const DashboardPage = () => {
  const { serviceStats, services, loading, error, activeTab, setActiveTab } = useServiceData();
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-app-blue p-4">
      <div className="container mx-auto">
        <h1 className="text-white text-3xl font-bold text-center mb-8">Informasi Antrian Servis</h1>
        
        {/* Service Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-app-dark rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-white text-xl mb-4">Service Umum</h2>
            <CircularProgress 
              value={serviceStats.serviceUmum.current} 
              max={serviceStats.serviceUmum.max} 
              color="text-app-blue" 
            />
            <span className="text-gray-400 mt-4">Current Occupancy</span>
          </div>
          
          <div className="bg-app-dark rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-white text-xl mb-4">Cuci Steam</h2>
            <CircularProgress 
              value={serviceStats.cuciSteam.current} 
              max={serviceStats.cuciSteam.max} 
              color="ring-app-green" 
            />
            <span className="text-gray-400 mt-4">Current Occupancy</span>
          </div>
          
          <div className="bg-app-dark rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-white text-xl mb-4">Ganti Oli</h2>
            <CircularProgress 
              value={serviceStats.gantiOli.current} 
              max={serviceStats.gantiOli.max} 
              color="ring-app-yellow" 
            />
            <span className="text-gray-400 mt-4">Current Occupancy</span>
          </div>
          
          <div className="bg-app-dark rounded-lg p-6 flex flex-col items-center">
            <h2 className="text-white text-xl mb-4">Service Berat</h2>
            <CircularProgress 
              value={serviceStats.serviceBerat.current} 
              max={serviceStats.serviceBerat.max} 
              color="ring-app-red" 
            />
            <span className="text-gray-400 mt-4">Current Occupancy</span>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex rounded-full bg-app-dark overflow-hidden">
            <button
              onClick={() => setActiveTab('antrian')}
              className={`px-8 py-2 text-white ${
                activeTab === 'antrian' ? 'bg-indigo-600' : ''
              }`}
            >
              Antrian ({services.filter(s => s.status !== 'Completed').length})
            </button>
            <button
              onClick={() => setActiveTab('dikerjakan')}
              className={`px-8 py-2 text-white ${
                activeTab === 'dikerjakan' ? 'bg-indigo-600' : ''
              }`}
            >
              Dikerjakan (4)
            </button>
          </div>
        </div>
        
        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              id={service.id}
              type={service.type}
              vehicle={service.vehicle}
              customer={service.customer}
              estimate={service.estimate}
              status={service.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
