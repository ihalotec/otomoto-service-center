
import React from 'react';
import { Clock, User, Car } from 'lucide-react';

const ServiceCardDetail = ({ vehicle, customer, estimate }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <Car className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
            {vehicle.plate}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {vehicle.model} ({vehicle.type})
          </p>
        </div>
      </div>
      
      <div className="flex items-center">
        <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
            {customer.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {customer.phone}
          </p>
        </div>
      </div>
      
      <div className="flex items-center">
        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
        <div className="overflow-hidden">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Est. {estimate.duration}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {estimate.completionTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardDetail;
