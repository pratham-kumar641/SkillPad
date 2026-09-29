import React from 'react';

const Card = ({ title, value, icon, className = '' }) => {
  return (
    <div className={`card p-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        {icon && (
          <div className="p-3 bg-primary-50 rounded-full text-primary-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
