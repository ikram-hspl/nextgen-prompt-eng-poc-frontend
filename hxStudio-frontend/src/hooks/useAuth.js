import { useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useCookies } from 'react-cookie';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    const token = cookies.token;
    if (token) {
      setUser(jwtDecode(token));
    }
  }, [cookies]);

  const login = async (email, password) => {
    try {
      const UserName=email;
      const response = await axios.post('https://localhost:7281/api/auth/login', { UserName, password });
      if (response.data.isSuccess) {
        const { token } = response.data.result;
        setCookie('token', token, { path: '/' });
        setUser(jwtDecode(token));
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

  return { user, login, logout };
};

export default useAuth;
