// src/components/ProtectedRoute.jsx
import React from 'react';
import AuthRoute from '../component/Authentication/AuthRoute';

const ProtectedRoute = ({ children }) => {
  return (
    <AuthRoute>
      {children}
    </AuthRoute>
  );
};

export default ProtectedRoute;
