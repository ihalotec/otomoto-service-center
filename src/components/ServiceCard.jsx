
import React from 'react';

const ServiceCard = ({ id, type, vehicle, customer, estimate, status }) => {
  // Determine card color based on service type
  const getCardColor = () => {
    switch (type) {
      case 'Service Umum':
        return 'bg-amber-600';
      case 'Cuci Steam':
        return 'bg-amber-700';
      case 'Ganti Oli':
        return 'bg-amber-800';
      case 'Service Berat':
        return 'bg-green-700';
      default:
        return 'bg-gray-700';
    }
  };

  return (
    <div className={`${getCardColor()} rounded-lg p-4 text-white shadow-lg`}>
      <div className="flex justify-between items-start mb-2">
        <span className="font-bold text-lg">{id}</span>
        <span className={`px-2 py-1 rounded text-xs ${status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'}`}>
          {status === 'Completed' ? 'Completed' : 'In Progress'}
        </span>
      </div>
      <div className="font-semibold text-lg mb-1">{type}</div>
      <div className="text-sm mb-1">{vehicle}</div>
      <div className="text-sm mb-2">{customer}</div>
      <div className="text-xs">
        {status === 'Completed' ? 'Selesai! Hilang dalam 5s' : `Estimasi: ${estimate} menit`}
      </div>
    </div>
  );
};

export default ServiceCard;
