if (__DEV__) {
  require("./ReactotronConfig");
}
import React, {useEffect, useState} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';

// Import your screens
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import OwnEmergencyScreen from './src/screens/OwnEmergencyScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import MedicalTriageScreen from './src/screens/MedicalTriageScreen';
import PatientDataScreen from './src/screens/PatientDataScreen';
import UserInfoScreen from './src/screens/UserInfoScreen';
import SignOutScreen from './src/screens/SignOutScreen';
import UnAuthenticatedNavigation from './UnAuthenticatedNavigation';
import AuthenticatedNavigation from './AuthenticatedNavigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF8C00',
    accent: '#FFD580',
    background: '#FFF4E5',
    surface: '#FFF',
    text: '#333',
    placeholder: '#900',
    error: '#D32F2F',
    active: '#c4461c',
    inActive: '#ffbeaa',
  }
};

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
        {isAuthenticated ? <AuthenticatedNavigation theme={theme} /> : <UnAuthenticatedNavigation theme={theme} />}
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;
