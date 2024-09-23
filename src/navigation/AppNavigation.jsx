import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

const AppNavigation = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      {userToken ? <ProfileStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;