import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Alert, BackHandler, View, PermissionsAndroid } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Button, Icon } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import BackgroundFetch from "react-native-background-fetch";
import customFont from '../components/CustomFont';
import Logo from '../components/Logo';
import GradientBackground from '../components/GradientBackground';
import { useAxios } from '../context/AxiosContext';


const SignInScreen = () => {
  const axios = useAxios();
  const [accessToken, setAccessToken] = useState(null);
  const [email, setEmail] = useState('example@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigation = useNavigation()
  const [location, setLocation] = useState(null);

  const fadeAnim = useSharedValue(0);
  const translateY = useSharedValue(100);

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: translateY.value }],
  }));

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const startLocationTracking = () => {
    // Start tracking the location
    Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        sendLocationToServer(latitude, longitude);
      },
      (errorException) => {
        console.error(errorException);
      },
      { enableHighAccuracy: true, distanceFilter: 0, interval: 2000, fastestInterval: 2000 }
    );
    BackHandler.exitApp()
  };

  const sendLocationToServer = async (latitude, longitude) => {
    try {
      // await axios.post('https://your-server-endpoint.com/location', {
      //   latitude,
      //   longitude,
      // });
      console.log('Location sent:', latitude, longitude);
    } catch (errorException) {
      console.error('Error sending location:', errorException);
    }
  };

  const setupBackgroundFetch = () => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // Tempo mínimo para execução da tarefa em background
        stopOnTerminate: false,
        startOnBoot: true,
      },
      async () => {
        console.log("[BackgroundFetch]:");
        startLocationTracking();
      },
      (errorException) => {
        console.error("BackgroundFetch failed to start:", errorException);
      }
    );
  };

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000 });
    const init = async () => {
      const permissionGranted = await requestLocationPermission();
      if (permissionGranted) {
        setupBackgroundFetch();
      }
    };
    init();
  }, []);

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password
    };

    try {
      const response = await axios.post('/sign_in', data);
      const token = response.data.token;
      console.log(response.data)
      await AsyncStorage.setItem('authToken', token);
      navigation.navigate('AuthenticatedTabsStack')
    } catch (errorException) {
      console.log('Error sign in:', errorException);
      setError('Invalid credentials');
    }
  };
  
  const loggedIn = accessToken !== null;
  
  return (
    <GradientBackground>
      <View className="flex justify-center items-center w-full h-full">
      <Logo />

      <Animated.View className='w-full' style={[fadeInStyle]}>
        <View className="flex flex-col space-y-2 w-full px-4">
          {error !== '' && <View className='flex flex-row items-center space-x-2 bg-orange-100 rounded-md p-2'><Icon source='alert-circle-check-outline' size={30} color='#b33205' /><Text className="text-strong-dark-orange">{error}</Text></View>}
          <View>
            <TextInput
              activeOutlineColor='#b33205'
              outlineColor='#b33205'
              className=" text-gray-600 bg-orange-50"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Type your email address"
              label="Email"
              mode='outlined'
              keyboardType='email-address'
              />
          </View>

          <View>
            <TextInput
              activeOutlineColor='#b33205'
              outlineColor='#b33205'
              className="text-gray-600 bg-orange-50"
              value={password}
              label="Password"
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              mode='outlined'
              placeholder="Type your password"
              />
          </View>

          <Button
            mode="elevated"
            size={20}
            icon={() => (
              <Icon source="account-check-outline" size={30} color='#FFFFFF' />
            )}
            onPress={handleLogin}
            disabled={accessToken}
            className="bg-strong-dark-orange rounded-md"
            contentStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
          >
            <Text className="text-xl text-white" style={customFont.protestRiotRegular}>Sign In</Text>
          </Button>
        </View>
      </Animated.View>
      <Animated.View style={[fadeInStyle]}>
        <TouchableOpacity className="mt-2" onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text className="text-gray-600">Forgot password? Click here</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
    </GradientBackground>
  );
}


export default SignInScreen;
