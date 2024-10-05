import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Alert, BackHandler, View, PermissionsAndroid } from 'react-native';
import { Button, Icon } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Auth0 from 'react-native-auth0';
import Geolocation from '@react-native-community/geolocation';
import BackgroundFetch from "react-native-background-fetch";
import config from './auth0';
import customFont from '../components/CustomFont';
import Logo from '../components/Logo';
import GradientBackground from '../components/GradientBackground';

const auth0 = new Auth0(config);

const LoginScreen = () => {
  const [accessToken, setAccessToken] = useState(null);
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
      (error) => {
        console.error(error);
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
    } catch (error) {
      console.error('Error sending location:', error);
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
      (error) => {
        console.error("BackgroundFetch failed to start:", error);
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
  
  const onLogin = () => {
    auth0.webAuth.authorize().then(credentials => {
      Alert.alert('AccessToken: ' + credentials.accessToken);
      setAccessToken(credentials.accessToken);
    }).catch(error => console.log(error));
  };
  
  const onLogout = () => {
    auth0.webAuth
    .clearSession({})
    .then(() => {
      Alert.alert('Logged out!');
      setAccessToken(null);
    })
    .catch(() => {
      console.log('Log out cancelled');
    });
  };
  
  const loggedIn = accessToken !== null;
  
  return (
    <GradientBackground>
      <Logo />

      <Animated.View style={[fadeInStyle]}>
        <View className="flex flex-col space-y-2">
          <Button
            mode="text"
            size={20}
            icon={() => (
              <Icon source="account-arrow-right" size={30} color='#FFFFFF' />
            )}
            onPress={loggedIn ? onLogout : onLogin}
            disabled={loggedIn}
            className="rounded-lg bg-dark-orange"
            contentStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
          >
            <Text className="text-xl text-white" style={customFont.protestRiotRegular}>{loggedIn ? 'Sair' : 'Entrar'}</Text>
          </Button>

          <Button
            mode="text"
            size={20}
            icon={() => (
              <Icon source="account-arrow-right" size={30} color='#FFFFFF' />
            )}
            onPress={startLocationTracking}
            disabled={loggedIn}
            className="rounded-lg bg-dark-orange"
            contentStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
          >
            <Text className="text-xl text-white" style={customFont.protestRiotRegular}>Iniciar percurso</Text>
          </Button>
        </View>
      </Animated.View>
      <Animated.View style={[fadeInStyle]}>
        <TouchableOpacity className="mt-2">
          <Text className="text-dark-orange">Esqueceu sua senha? Clique aqui</Text>
        </TouchableOpacity>
      </Animated.View>
    </GradientBackground>
  );
}


export default LoginScreen;
