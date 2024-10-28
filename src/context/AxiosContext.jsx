import React, { createContext, useContext } from 'react';
import axios from 'axios';
axios.defaults.baseURL = process.env.REACT_APP_API_DOMAIN;
console.log(process.env.REACT_APP_API_DOMAIN)

const AxiosContext = createContext();

export const AxiosProvider = ({ children }) => {
  return (
    <AxiosContext.Provider value={axios}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => useContext(AxiosContext);
