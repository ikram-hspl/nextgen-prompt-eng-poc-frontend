import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useCookies } from 'react-cookie';




const useAuth = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [token, setToken] = useState(cookies.token || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = cookies.token;
    console.log(token)
    if (token) {
      setUser(jwtDecode(token));
   
      console.log("user--->",user)
    }
  }, [cookies]);

 


  const login = async (email, password) => {
    try {
      const UserName=email;
      const response = await axios.post('https://localhost:7281/api/auth/login', { UserName, password });
      if (response.data.isSuccess) {
        const { token, user } = response.data.result;
        setCookie('token', token, { path: '/' });
        setUser(user);
        setIsLoggedIn(true);
        setToken(token);
        console.log(user)
        return Promise.resolve();
      } else {
        return Promise.reject(response.data.message || 'Login failed');
      }
    } catch (error) {
      return Promise.reject(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    removeCookie('token', { path: '/' });
    setUser(null);
    alert("logged out")
  };

  return { user, login, logout, isLoggedIn };
};

export default useAuth;
