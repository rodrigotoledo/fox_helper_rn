// import React, {createContext, useContext, useMemo} from 'react';
// import {Alert} from 'react-native';
// import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({children}) => {

//   const loginMutation = useMutation({
//     mutationFn: ({email,password}) => {
//     },
//     onSuccess: data => {
//       // navigate....
//     },
//   });

//   const logoutMutation = useMutation({
//     mutationFn: () => {
//     },
//     onSuccess: data => {
//       // navigate....
//     },
//   });

//   const resetPasswordMutation = useMutation({
//     mutationFn: ({email}) => {
//     },
//     onSuccess: data => {
//       // navigate....
//     },
//   });

//   const loginTask = ({email, password}) => {
//     loginMutation.mutate({email: email, password: password});
//   };

//   const logoutTask = () => {
//     logoutMutation.mutate();
//   };
  
//   const resetPasswordTask = ({email}) => {
//     resetPasswordMutation.mutate({email: email});
//   };

//   const value = useMemo(
//     () => ({
//       loginTask,
//       logoutTask,
//       resetPasswordTask,
//     }),
//     [loginMutation, logoutMutation, resetPasswordMutation],
//   );

//   return (
//     <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
//   );
// };

// export const useAuthContext = () => useContext(AuthContext);

import React, { createContext, useState, useEffect } from 'react';
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
    <AuthContext.Provider value={{ login, logout, userToken, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};