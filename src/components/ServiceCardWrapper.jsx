
import React from 'react';
import { ArrowRight, Tool } from 'lucide-react';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import ServiceCardDetail from './ServiceCardDetail';

// A wrapper component that enhances the ServiceCard with theme support
const ServiceCardWrapper = ({ id, type, vehicle, customer, estimate, status }) => {
  // Define style variations based on service type
  const typeStyles = {
    'Service Umum': {
      icon: <Tool className="h-5 w-5 text-indigo-500" />,
      bg: "bg-indigo-50 dark:bg-indigo-900/30",
      text: "text-indigo-700 dark:text-indigo-300",
      border: "border-indigo-200 dark:border-indigo-800"
    },
    'Cuci Steam': {
      icon: <Tool className="h-5 w-5 text-emerald-500" />,
      bg: "bg-emerald-50 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-300",
      border: "border-emerald-200 dark:border-emerald-800"
    },
    'Ganti Oli': {
      icon: <Tool className="h-5 w-5 text-amber-500" />,
      bg: "bg-amber-50 dark:bg-amber-900/30",
      text: "text-amber-700 dark:text-amber-300",
      border: "border-amber-200 dark:border-amber-800"
    },
    'Service Berat': {
      icon: <Tool className="h-5 w-5 text-rose-500" />,
      bg: "bg-rose-50 dark:bg-rose-900/30",
      text: "text-rose-700 dark:text-rose-300",
      border: "border-rose-200 dark:border-rose-800"
    }
  };

  const typeStyle = typeStyles[type] || typeStyles['Service Umum'];

  // Define status badge styles with improved light/dark mode support
  const statusStyles = {
    'waiting': {
      bg: "bg-yellow-100 dark:bg-yellow-900/40",
      text: "text-yellow-800 dark:text-yellow-300",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      label: "Menunggu"
    },
    'in-progress': {
      bg: "bg-blue-100 dark:bg-blue-900/40",
      text: "text-blue-800 dark:text-blue-300",
      borderColor: "border-blue-200 dark:border-blue-800",
      label: "Sedang Dikerjakan"
    },
    'completed': {
      bg: "bg-green-100 dark:bg-green-900/40",
      text: "text-green-800 dark:text-green-300",
      borderColor: "border-green-200 dark:border-green-800",
      label: "Selesai"
    }
  };

  const statusStyle = statusStyles[status] || statusStyles['waiting'];

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md overflow-hidden",
      "border border-gray-100 dark:border-gray-800",
      "bg-white dark:bg-gray-800/90"
    )}>
      <div className={cn(
        "px-4 py-3 flex justify-between items-center border-b", 
        typeStyle.bg,
        "border-b", 
        typeStyle.border
      )}>
        <div className="flex items-center">
          {typeStyle.icon}
          <h4 className={cn("ml-2 font-medium", typeStyle.text)}>{type}</h4>
        </div>
        <span className={cn(
          "text-xs px-2.5 py-1 rounded-full",
          statusStyle.bg,
          statusStyle.text,
          "border",
          statusStyle.borderColor
        )}>
          {statusStyle.label}
        </span>
      </div>
      
      <div className="p-4">
        <ServiceCardDetail 
          vehicle={vehicle} 
          customer={customer} 
          estimate={estimate} 
        />
      
        <button className={cn(
          "w-full mt-4 py-2 text-sm font-medium flex items-center justify-center group",
          "bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700",
          "text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300",
          "border border-gray-200 dark:border-gray-700 rounded-lg",
          "transition-colors"
        )}>
          Lihat Detail 
          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </Card>
  );
};

export default ServiceCardWrapper;
