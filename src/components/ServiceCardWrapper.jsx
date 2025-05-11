
import React from 'react';
import { Clock, Tool, User, Car, ArrowRight } from 'lucide-react';

// A wrapper component that enhances the ServiceCard with theme support
const ServiceCardWrapper = ({ id, type, vehicle, customer, estimate, status }) => {
  // Define style variations based on service type
  const typeStyles = {
    'Service Umum': {
      icon: <Tool className="h-5 w-5 text-indigo-500" />,
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
      text: 'text-indigo-700 dark:text-indigo-300',
      border: 'border-indigo-200 dark:border-indigo-700'
    },
    'Cuci Steam': {
      icon: <Tool className="h-5 w-5 text-emerald-500" />,
      bg: 'bg-emerald-100 dark:bg-emerald-900/30',
      text: 'text-emerald-700 dark:text-emerald-300',
      border: 'border-emerald-200 dark:border-emerald-700'
    },
    'Ganti Oli': {
      icon: <Tool className="h-5 w-5 text-amber-500" />,
      bg: 'bg-amber-100 dark:bg-amber-900/30',
      text: 'text-amber-700 dark:text-amber-300',
      border: 'border-amber-200 dark:border-amber-700'
    },
    'Service Berat': {
      icon: <Tool className="h-5 w-5 text-rose-500" />,
      bg: 'bg-rose-100 dark:bg-rose-900/30',
      text: 'text-rose-700 dark:text-rose-300',
      border: 'border-rose-200 dark:border-rose-700'
    }
  };

  const typeStyle = typeStyles[type] || typeStyles['Service Umum'];

  // Define status badge styles
  const statusStyles = {
    'waiting': {
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
      text: 'text-yellow-800 dark:text-yellow-300',
      label: 'Menunggu'
    },
    'in-progress': {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-800 dark:text-blue-300',
      label: 'Sedang Dikerjakan'
    },
    'completed': {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-800 dark:text-green-300',
      label: 'Selesai'
    }
  };

  const statusStyle = statusStyles[status] || statusStyles['waiting'];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`${typeStyle.bg} ${typeStyle.border} border-b px-4 py-3 flex justify-between items-center`}>
        <div className="flex items-center">
          {typeStyle.icon}
          <h4 className={`ml-2 font-medium ${typeStyle.text}`}>{type}</h4>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
          {statusStyle.label}
        </span>
      </div>
      
      <div className="p-4">
        <div className="flex items-center mb-3">
          <Car className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{vehicle.plate}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{vehicle.model} ({vehicle.type})</p>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{customer.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{customer.phone}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Est. {estimate.duration}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{estimate.completionTime}</p>
          </div>
        </div>
      </div>
      
      <button className="w-full bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors flex items-center justify-center group">
        Lihat Detail 
        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};

export default ServiceCardWrapper;
