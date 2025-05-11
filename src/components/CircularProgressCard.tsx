
import React from 'react';

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
      bg: "bg-gradient-to-br from-indigo-500/10 to-blue-500/10 dark:from-indigo-500/20 dark:to-blue-500/20",
      ring: "ring-indigo-500",
      text: "text-indigo-600 dark:text-indigo-300",
      badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
    },
    green: {
      bg: "bg-gradient-to-br from-emerald-500/10 to-green-500/10 dark:from-emerald-500/20 dark:to-green-500/20",
      ring: "ring-emerald-500",
      text: "text-emerald-600 dark:text-emerald-300",
      badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300"
    },
    amber: {
      bg: "bg-gradient-to-br from-amber-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:to-yellow-500/20",
      ring: "ring-amber-500",
      text: "text-amber-600 dark:text-amber-300",
      badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300"
    },
    red: {
      bg: "bg-gradient-to-br from-rose-500/10 to-red-500/10 dark:from-rose-500/20 dark:to-red-500/20",
      ring: "ring-rose-500",
      text: "text-rose-600 dark:text-rose-300",
      badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300"
    }
  };

  const colorClass = colorClasses[type];

  return (
    <div className={`rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 ${colorClass.bg}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className={`text-lg font-medium ${colorClass.text}`}>{title}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${colorClass.badge}`}>
          {percentage}% Occupied
        </span>
      </div>

      <div className="flex justify-center my-4 relative">
        <svg className="w-36 h-36" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle 
            className="text-gray-200 dark:text-gray-700" 
            strokeWidth="8" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50" 
          />
          {/* Progress circle */}
          <circle 
            className={`${colorClass.text} transition-all duration-300 ease-in-out`} 
            strokeWidth="8" 
            strokeDasharray={`${percentage * 2.51} 251`} 
            strokeLinecap="round" 
            stroke="currentColor" 
            fill="transparent" 
            r="40" 
            cx="50" 
            cy="50"
            transform="rotate(-90 50 50)" 
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
    </div>
  );
};

export default CircularProgressCard;
