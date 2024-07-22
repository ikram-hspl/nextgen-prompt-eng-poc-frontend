import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import { Navigate } from 'react-router-dom';
import DashboardLayout from '../Components/DashboardLayout';


const Dashboard = () => {
  const { user, login, logout } = useContext(AuthContext);

  const handleLogout = async ()=>{
    await logout();
    <Navigate to={"/"} />
  }
  return (
    <div>
      <DashboardLayout />

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  )
}

export default Dashboard