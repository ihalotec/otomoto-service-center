
import React from 'react';
import { Clock, User, Car } from 'lucide-react';

const ServiceCard = ({ id, type, vehicle, customer, estimate, status }) => {
  // Determine card styling based on service type
  const getCardStyle = () => {
    switch (type) {
      case 'Service Umum':
        return {
          gradient: 'from-blue-700 to-blue-900',
          icon: <span className="text-blue-200 text-lg font-bold">🔧</span>,
          border: 'border-blue-500'
        };
      case 'Cuci Steam':
        return {
          gradient: 'from-green-700 to-green-900',
          icon: <span className="text-green-200 text-lg font-bold">💦</span>,
          border: 'border-green-500'
        };
      case 'Ganti Oli':
        return {
          gradient: 'from-yellow-600 to-amber-800',
          icon: <span className="text-yellow-200 text-lg font-bold">🛢️</span>,
          border: 'border-yellow-500'
        };
      case 'Service Berat':
        return {
          gradient: 'from-red-700 to-red-900',
          icon: <span className="text-red-200 text-lg font-bold">⚙️</span>,
          border: 'border-red-500'
        };
      default:
        return {
          gradient: 'from-gray-700 to-gray-900',
          icon: <span className="text-gray-200 text-lg font-bold">🔧</span>,
          border: 'border-gray-500'
        };
    }
  };

  // Safely extract vehicle information
  const vehicleInfo = typeof vehicle === 'object' && vehicle !== null
    ? `${vehicle.plate || 'Unknown'} - ${vehicle.model || 'Unknown'} ${vehicle.type ? `(${vehicle.type})` : ''}`
    : 'Unknown Vehicle';
  
  // Safely extract customer information
  const customerInfo = typeof customer === 'object' && customer !== null
    ? customer.name || 'Unknown Customer'
    : 'Unknown Customer';
  
  // Safely extract estimate information
  const estimateInfo = typeof estimate === 'object' && estimate !== null
    ? estimate.duration || 'Unknown'
    : 'Unknown';

  const style = getCardStyle();

  return (
    <div className={`bg-gradient-to-br ${style.gradient} rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
      <div className={`border-l-4 ${style.border} p-4`}>
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center space-x-2">
            {style.icon}
            <span className="font-bold text-lg text-white">{id}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Completed' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-gray-900'}`}>
            {status === 'Completed' ? 'Selesai' : 'Dikerjakan'}
          </span>
        </div>
        
        <h3 className="font-semibold text-xl text-white mb-3">{type}</h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-gray-200">
            <Car className="h-4 w-4 mr-2" />
            <span className="text-sm">{vehicleInfo}</span>
          </div>
          <div className="flex items-center text-gray-200">
            <User className="h-4 w-4 mr-2" />
            <span className="text-sm">{customerInfo}</span>
          </div>
          <div className="flex items-center text-gray-200">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {status === 'Completed' ? 'Selesai!' : `Est: ${estimateInfo} menit`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
