// src/components/ui/input.jsx

import React from 'react';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border rounded p-2 focus:outline-none focus:ring focus:ring-blue-300 ${className}`}
      {...props}
    />
  );
});

Input.displayName = 'Input'; // Menetapkan display name untuk debugging
