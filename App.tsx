if (__DEV__) {
  require("./ReactotronConfig");
}
import React, {useEffect, useState} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import your screens
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import HomeScreen from './src/screens/HomeScreen';
import OwnEmergencyScreen from './src/screens/OwnEmergencyScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import MedicalTriageScreen from './src/screens/MedicalTriageScreen';
import PatientDataScreen from './src/screens/PatientDataScreen';
import UserInfoScreen from './src/screens/UserInfoScreen';
import SignOutScreen from './src/screens/SignOutScreen';

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
  }
};

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const AuthenticatedTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        tabBarStyle: { backgroundColor: '#b33205' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#fed7aa',
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Triage',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="stethoscope"
              color={color}
              size={size}
            />
          )
        }}
      />
      <Tab.Screen
        name="UserInfoScreen"
        component={UserInfoScreen}
        options={{
          tabBarLabel: 'Your Info',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="card-account-details"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SignOutScreen"
        component={SignOutScreen}
        options={{
          tabBarLabel: 'Logout',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const SignInSignUpStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignInScreen"
        options={{headerShown: false}}
        component={SignInScreen}
      />
      <Stack.Screen
        name="SignUpScreen"
        options={{headerShown: false}}
        component={SignUpScreen}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        options={{
          title: 'Forgot Password',
          headerStyle: {
            backgroundColor: '#b33205',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name="AuthenticatedTabsStack"
        options={{headerShown: false}}
        component={AuthenticatedTabsStack}
      />
    </Stack.Navigator>
  );
};

const AuthenticatedTabsStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AuthenticatedTabs"
        component={AuthenticatedTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignInScreen"
        component={SignInScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};


// Stack for Home navigation
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeInitial" component={HomeScreen} />
      <Stack.Screen name="PatientData" component={PatientDataScreen} />
      <Stack.Screen name="MedicalTriage" component={MedicalTriageScreen} />
      <Stack.Screen name="Emergency" component={EmergencyScreen} />
      <Stack.Screen name="OwnEmergency" component={OwnEmergencyScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
    </Stack.Navigator>
  );
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

  if (isAuthenticated === null) {
    return null; // You can add a loading spinner here
  }

  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {isAuthenticated ? <AuthenticatedTabsStack /> : <SignInSignUpStack />}
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};

export default App;
