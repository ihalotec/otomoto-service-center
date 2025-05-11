
import React from 'react';
import { useServiceData } from '../../hooks/useServiceData';
import Navbar from '../../components/Navbar';
import CircularProgressCard from '../../components/CircularProgressCard';
import ServiceCard from '../../components/ServiceCard';
import { ChevronRight, AlertCircle, Calendar, Clipboard, RefreshCw } from 'lucide-react';

const DashboardPage = () => {
  const { serviceStats, services, loading, error, activeTab, setActiveTab } = useServiceData();
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('id-ID', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  
  const formattedTime = currentDate.toLocaleTimeString('id-ID', { 
    hour: '2-digit', 
    minute: '2-digit'
  });
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <RefreshCw className="h-12 w-12 text-indigo-500 animate-spin" />
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg font-medium">Loading data...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md border border-red-100 dark:border-red-900">
            <div className="flex items-center mb-4">
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
              <h2 className="text-red-500 text-xl font-bold">Error Loading Data</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
            <button 
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-gray-800 dark:text-white text-3xl font-bold mb-1">Dashboard Bengkel</h2>
            <p className="text-gray-500 dark:text-gray-400">Pantau antrian dan status layanan bengkel Anda</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-3 shadow-sm border border-gray-200 dark:border-gray-700 flex items-center">
            <Calendar className="h-5 w-5 text-indigo-500 mr-2" />
            <div className="text-sm">
              <span className="text-gray-800 dark:text-gray-200">{formattedDate}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">• {formattedTime} WIB</span>
            </div>
          </div>
        </div>
        
        <div className="mb-10">
          <div className="flex flex-wrap items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Statistik Layanan</h3>
            <div className="flex items-center">
              <RefreshCw className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Terakhir diperbarui 2 menit lalu</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CircularProgressCard 
              title="Service Umum" 
              description="Pemeliharaan dan perbaikan rutin"
              value={serviceStats.serviceUmum.current} 
              max={serviceStats.serviceUmum.max} 
              type="blue" 
            />
            
            <CircularProgressCard 
              title="Cuci Steam" 
              description="Layanan pembersihan kendaraan"
              value={serviceStats.cuciSteam.current} 
              max={serviceStats.cuciSteam.max} 
              type="green" 
            />
            
            <CircularProgressCard 
              title="Ganti Oli" 
              description="Layanan penggantian pelumas"
              value={serviceStats.gantiOli.current} 
              max={serviceStats.gantiOli.max} 
              type="amber" 
            />
            
            <CircularProgressCard 
              title="Service Berat" 
              description="Perbaikan komponen utama"
              value={serviceStats.serviceBerat.current} 
              max={serviceStats.serviceBerat.max} 
              type="red" 
            />
          </div>
        </div>
        
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="mb-4 sm:mb-0">
                <div className="flex items-center">
                  <Clipboard className="h-5 w-5 text-indigo-500 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Daftar Layanan</h3>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                  {activeTab === 'antrian' ? 'Kendaraan yang sedang menunggu' : 'Kendaraan yang sedang diproses'}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex">
                <button 
                  onClick={() => setActiveTab('antrian')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    activeTab === 'antrian' 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Antrian
                </button>
                <button 
                  onClick={() => setActiveTab('dikerjakan')}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                    activeTab === 'dikerjakan' 
                      ? 'bg-indigo-600 text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Dikerjakan
                </button>
              </div>
            </div>
            
            {services.length === 0 ? (
              <div className="py-16 text-center">
                <div className="bg-gray-100 dark:bg-gray-700 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clipboard className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
                <h4 className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-2">Tidak ada layanan yang tersedia</h4>
                <p className="text-gray-500 dark:text-gray-400">Belum ada kendaraan dalam {activeTab === 'antrian' ? 'antrian' : 'proses pengerjaan'} saat ini</p>
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
            
            {services.length > 0 && (
              <div className="mt-6 flex justify-center">
                <button className="group flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors">
                  <span className="font-medium">Lihat Semua {activeTab === 'antrian' ? 'Antrian' : 'Pengerjaan'}</span>
                  <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
