import React from 'react';

const StatusBadge = ({ status }) => {
  let bgColor = 'bg-gray-100';
  let textColor = 'text-gray-800';

  switch (status.toLowerCase()) {
    case 'todo':
      bgColor = 'bg-gray-100';
      textColor = 'text-gray-800';
      break;
    case 'in progress':
      bgColor = 'bg-blue-100';
      textColor = 'text-blue-800';
      break;
    case 'completed':
    case 'reviewed':
      bgColor = 'bg-green-100';
      textColor = 'text-green-800';
      break;
    case 'pending':
      bgColor = 'bg-yellow-100';
      textColor = 'text-yellow-800';
      break;
    case 'failed':
      bgColor = 'bg-red-100';
      textColor = 'text-red-800';
      break;
    default:
      break;
  }

  return (
    <span className={`${bgColor} ${textColor} text-xs font-medium px-2.5 py-0.5 rounded-full`}>
      {status}
    </span>
  );
};

export default StatusBadge;
