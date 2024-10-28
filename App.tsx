if (__DEV__) {
  require("./ReactotronConfig");
}
import React, {useEffect, useState} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';

// Import your screens
import UnAuthenticatedNavigation from './UnAuthenticatedNavigation';
import AuthenticatedNavigation from './AuthenticatedNavigation';
import theme from './theme';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
  const checkAuthentication = async () => {
    try {
      const value = await AsyncStorage.getItem('authToken');
      setIsAuthenticated(value !== null);
    } catch (error) {
      console.log('Error:', error);
      setIsAuthenticated(false);
    }
  };

  checkAuthentication();
}, []);
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <NavigationContainer>
        {isAuthenticated ? <AuthenticatedNavigation /> : <UnAuthenticatedNavigation />}
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;
