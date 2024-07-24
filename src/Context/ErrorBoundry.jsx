import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

const ErrorBoundary = ({ children }) => {
  const { logout } = useContext(AuthContext);


  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const errorHandler = (event) => {
      const error = event?.reason || event?.error;
      console.error('Error caught in ErrorBoundary:', error);
      console.log("error-->",error)

      if (error?.response?.status === 401 || error?.message === 'Invalid token') {
        handleLogout();
      }
    };
   

    window.addEventListener('error', errorHandler);
    window.addEventListener('unhandledrejection', errorHandler);

    return () => {
      window.removeEventListener('error', errorHandler);
      window.removeEventListener('unhandledrejection', errorHandler);
    };
  }, [logout]);

  return <>{children}</>;
};

export default ErrorBoundary;
