import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { Button, Icon } from 'react-native-paper';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Auth0 from 'react-native-auth0';
import config from './auth0';
import customFont from '../components/CustomFont';
import Logo from '../components/Logo';
import GradientBackground from '../components/GradientBackground';

const auth0 = new Auth0(config);

const LoginScreen = () => {
  const [accessToken, setAccessToken] = useState(null);

  const fadeAnim = useSharedValue(0);
  const translateY = useSharedValue(100);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000 });
  }, []);

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: translateY.value }],
  }));
  
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
