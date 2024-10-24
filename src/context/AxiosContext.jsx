import React, { createContext, useContext } from 'react';
import axios from 'axios';
import Config from 'react-native-config';

axios.defaults.baseURL = Config.API_DOMAIN || process.env.API_DOMAIN;

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  return (
    <AxiosContext.Provider value={axios}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);
