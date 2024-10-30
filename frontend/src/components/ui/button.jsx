// src/components/ui/button.jsx

import React from 'react';

export const Button = ({ children, onClick, variant = 'default', className, ...props }) => {
  const variantClasses = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border border-blue-500 text-blue-500 hover:bg-blue-100',
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded focus:outline-none focus:ring focus:ring-blue-300 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
