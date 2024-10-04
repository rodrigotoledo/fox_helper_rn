import React, { createContext, useState, useEffect } from 'react';
import { Auth0Provider } from 'react-native-auth0';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (token) => {
    setIsLoading(true);
    setUserToken(token);
    await AsyncStorage.setItem('userToken', token);
    setIsLoading(false);
  };

  const logout = async () => {
    setIsLoading(true);
    setUserToken(null);
    await AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const checkLoggedIn = async () => {
    try {
      setIsLoading(false);
      const storedToken = await AsyncStorage.getItem('userToken');
      setUserToken(storedToken);
      setIsLoading(true);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Auth0Provider domain={process.env.DOMAIN} clientId={process.env.CLIENT_ID}>
      <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
        {children}
      </AuthContext.Provider>
    </Auth0Provider>
  );
};