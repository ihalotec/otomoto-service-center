
import React from 'react';
import { Clock, User, Car } from 'lucide-react';

const ServiceCardDetail = ({ vehicle, customer, estimate }) => {
  // Make sure vehicle exists before trying to access its properties
  const vehicleDisplay = vehicle && typeof vehicle === 'object' ? (
    <div className="flex items-center">
      <Car className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
      <div className="overflow-hidden">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
          {vehicle.plate || 'Unknown'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {/* Convert to string to ensure we're not rendering objects */}
          {typeof vehicle.model === 'string' ? vehicle.model : 'Unknown'} ({typeof vehicle.type === 'string' ? vehicle.type : 'Unknown'})
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-center">
      <Car className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Vehicle information unavailable</p>
    </div>
  );

  // Make sure customer exists before trying to access its properties
  const customerDisplay = customer && typeof customer === 'object' ? (
    <div className="flex items-center">
      <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
      <div className="overflow-hidden">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
          {typeof customer.name === 'string' ? customer.name : 'Unknown'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {typeof customer.phone === 'string' ? customer.phone : 'No phone'}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-center">
      <User className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Customer information unavailable</p>
    </div>
  );

  // Make sure estimate exists before trying to access its properties
  const estimateDisplay = estimate && typeof estimate === 'object' ? (
    <div className="flex items-center">
      <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
      <div className="overflow-hidden">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          Est. {typeof estimate.duration === 'string' ? estimate.duration : 'Unknown'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {typeof estimate.completionTime === 'string' ? estimate.completionTime : 'Unknown'}
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-center">
      <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2 flex-shrink-0" />
      <p className="text-sm text-gray-500 dark:text-gray-400">Estimate unavailable</p>
    </div>
  );

  return (
    <div className="space-y-3">
      {vehicleDisplay}
      {customerDisplay}
      {estimateDisplay}
    </div>
  );
};

export default ServiceCardDetail;
