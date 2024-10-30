import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext'; 

// Komponen ProtectedRoute
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    // Jika user belum login, redirect ke halaman login
    return <Navigate to="/auth" />;
  }

  // Jika user sudah login, izinkan akses ke halaman yang diminta
  return children;
};

export default ProtectedRoute;
