import React from 'react';

const Input = ({ label, id, type = 'text', className = '', ...props }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        className="input-field"
        {...props}
      />
    </div>
  );
};

export default Input;
