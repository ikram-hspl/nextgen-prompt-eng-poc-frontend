import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import {jwtDecode} from 'jwt-decode';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = ({ roles }) => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  let isAuthenticated = false;
  
  let userRoles = [];

  console.log("isLoggedIn-->",isLoggedIn)

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      isAuthenticated = !!decodedToken;
      userRoles = decodedToken.roles || []; // assuming roles are part of the token payload
    } catch (error) {
      isAuthenticated = false;
    }
  }

  if (!isAuthenticated ||  !isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.some(role => userRoles.includes(role))) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;


// src/components/ProtectedRoute.js
// import React, { useContext } from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

// const ProtectedRoute = ({ roles }) => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <div>Loading...</div>; // or a loading spinner
//   }

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (roles && !roles.some(role => user.roles.includes(role))) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
