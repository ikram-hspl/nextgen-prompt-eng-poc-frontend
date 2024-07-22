import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
// import AdminPage from './pages/AdminPage';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './Components/ProtectedRoutes';
import AuthProvider from './Context/AuthContext';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import DashboardLayout from './Components/DashboardLayout';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Uncomment and use this route if you have an AdminPage component */}
            <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
           
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        {/* <Route path="/temp" element={<DashboardLayout />} /> */}
        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
};
export default App;
