
import React from 'react';

const CircularProgress = ({ value, max, size = 120, strokeWidth = 12, color, label }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = ((max - value) / max) * circumference;
  
  // Calculate percentage for background animation
  const percentage = Math.round((value / max) * 100);
  
  return (
    <div className="relative inline-flex items-center justify-center transition-all duration-500">
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="text-gray-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={`${color} transition-all duration-700 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-bold text-white">{value}</span>
        <span className="text-xs text-gray-300">/{max}</span>
        {label && <span className="text-xs mt-1 text-gray-300">{label}</span>}
      </div>
    </div>
  );
};

export default CircularProgress;
