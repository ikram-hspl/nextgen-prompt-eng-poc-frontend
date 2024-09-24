import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../Components/DashboardLayout';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    <Navigate to="/" />;
  };

  return (
    <div>
      <DashboardLayout />
      <div className="d-flex justify-content-end me-5">
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;