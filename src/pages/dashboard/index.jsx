
import React from 'react';
import CircularProgress from '../../components/CircularProgress';
import ServiceCard from '../../components/ServiceCard';
import { useServiceData } from '../../hooks/useServiceData';
import Navbar from '../../components/Navbar';
import { ChevronRight } from 'lucide-react';

const DashboardPage = () => {
  const { serviceStats, services, loading, error, activeTab, setActiveTab } = useServiceData();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-4 border-t-indigo-500 border-r-transparent border-b-indigo-500 border-l-transparent animate-spin"></div>
          <p className="mt-4 text-indigo-300 text-lg font-medium">Loading data...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="bg-red-900 p-6 rounded-lg shadow-lg max-w-md">
          <h2 className="text-red-100 text-xl font-bold mb-4">Error Loading Data</h2>
          <p className="text-red-200">{error}</p>
          <button 
            className="mt-4 bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white text-3xl font-bold">Dashboard Bengkel</h2>
          <div className="text-sm text-gray-400">
            <span>Senin, 15 May 2025</span> • <span>13:45 WIB</span>
          </div>
        </div>
        
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-gray-300 mb-6">Statistik Layanan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-800 to-indigo-900 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-blue-200">Service Umum</h4>
                <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded-full">Reguler</span>
              </div>
              <div className="flex justify-center my-4">
                <CircularProgress 
                  value={serviceStats.serviceUmum.current} 
                  max={serviceStats.serviceUmum.max} 
                  color="text-blue-400" 
                  label="Kapasitas"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-blue-200 mt-2">
                <span>Antrian: {serviceStats.serviceUmum.current}</span>
                <span>Maks: {serviceStats.serviceUmum.max}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-green-200">Cuci Steam</h4>
                <span className="text-xs bg-green-700 text-white px-2 py-1 rounded-full">Cepat</span>
              </div>
              <div className="flex justify-center my-4">
                <CircularProgress 
                  value={serviceStats.cuciSteam.current} 
                  max={serviceStats.cuciSteam.max} 
                  color="text-green-400" 
                  label="Kapasitas"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-green-200 mt-2">
                <span>Antrian: {serviceStats.cuciSteam.current}</span>
                <span>Maks: {serviceStats.cuciSteam.max}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-700 to-yellow-900 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-amber-200">Ganti Oli</h4>
                <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded-full">Cepat</span>
              </div>
              <div className="flex justify-center my-4">
                <CircularProgress 
                  value={serviceStats.gantiOli.current} 
                  max={serviceStats.gantiOli.max} 
                  color="text-amber-400" 
                  label="Kapasitas"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-amber-200 mt-2">
                <span>Antrian: {serviceStats.gantiOli.current}</span>
                <span>Maks: {serviceStats.gantiOli.max}</span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-800 to-red-900 rounded-xl p-6 shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h4 className="text-lg font-medium text-red-200">Service Berat</h4>
                <span className="text-xs bg-red-700 text-white px-2 py-1 rounded-full">Intensif</span>
              </div>
              <div className="flex justify-center my-4">
                <CircularProgress 
                  value={serviceStats.serviceBerat.current} 
                  max={serviceStats.serviceBerat.max} 
                  color="text-red-400" 
                  label="Kapasitas"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-red-200 mt-2">
                <span>Antrian: {serviceStats.serviceBerat.current}</span>
                <span>Maks: {serviceStats.serviceBerat.max}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-300">Daftar Layanan</h3>
            <div className="flex space-x-2">
              <button 
                onClick={() => setActiveTab('antrian')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'antrian' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Antrian
              </button>
              <button 
                onClick={() => setActiveTab('dikerjakan')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'dikerjakan' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                Dikerjakan
              </button>
            </div>
          </div>
          
          {services.length === 0 ? (
            <div className="bg-gray-800 rounded-xl p-10 text-center">
              <h4 className="text-xl font-medium text-gray-400">Tidak ada layanan yang tersedia</h4>
              <p className="text-gray-500 mt-2">Belum ada kendaraan dalam antrian saat ini</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
          )}
          
          <div className="mt-6 flex justify-center">
            <button className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors">
              <span>Lihat Semua Antrian</span>
              <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
