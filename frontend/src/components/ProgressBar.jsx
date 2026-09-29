import React from 'react';

const ProgressBar = ({ progress, label, colorClass = 'bg-primary-600' }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        <span className="text-sm font-medium text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${colorClass}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
