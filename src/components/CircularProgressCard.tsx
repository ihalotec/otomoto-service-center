
import React from 'react';
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface CircularProgressCardProps {
  title: string;
  description: string;
  value: number;
  max: number;
  type: 'blue' | 'green' | 'amber' | 'red';
}

const CircularProgressCard: React.FC<CircularProgressCardProps> = ({ 
  title, 
  description, 
  value, 
  max, 
  type 
}) => {
  const percentage = Math.floor((value / max) * 100);
  
  // Colors based on theme and type
  const colorClasses = {
    blue: {
      bg: "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20",
      ring: "stroke-indigo-600 dark:stroke-indigo-400",
      bgRing: "stroke-indigo-100 dark:stroke-indigo-900/30",
      text: "text-indigo-700 dark:text-indigo-300",
      badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/50"
    },
    green: {
      bg: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
      ring: "stroke-emerald-600 dark:stroke-emerald-400",
      bgRing: "stroke-emerald-100 dark:stroke-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-300",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
      ring: "stroke-amber-600 dark:stroke-amber-400",
      bgRing: "stroke-amber-100 dark:stroke-amber-900/30",
      text: "text-amber-700 dark:text-amber-300",
      badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50"
    },
    red: {
      bg: "bg-gradient-to-br from-rose-50 to-red-50 dark:from-rose-900/20 dark:to-red-900/20",
      ring: "stroke-rose-600 dark:stroke-rose-400",
      bgRing: "stroke-rose-100 dark:stroke-rose-900/30",
      text: "text-rose-700 dark:text-rose-300",
      badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800/50"
    }
  };

  const colorClass = colorClasses[type];

  return (
    <Card className={cn(
      "overflow-hidden",
      "border border-gray-200 dark:border-gray-800",
      colorClass.bg
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className={`text-lg font-medium ${colorClass.text}`}>{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
          <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full", colorClass.badge)}>
            {percentage}% Occupied
          </span>
        </div>

        <div className="flex justify-center my-4 relative">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle 
              className={colorClass.bgRing}
              strokeWidth="8" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
            {/* Progress circle */}
            <circle 
              className={colorClass.ring}
              strokeWidth="8" 
              strokeDasharray={`${percentage * 2.51} 251`} 
              strokeLinecap="round" 
              stroke="currentColor" 
              fill="transparent" 
              r="40" 
              cx="50" 
              cy="50" 
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-3xl font-bold text-gray-800 dark:text-gray-100">{value}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 block">/{max}</span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>Queue: {value}</span>
          <span>Maximum: {max}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CircularProgressCard;
