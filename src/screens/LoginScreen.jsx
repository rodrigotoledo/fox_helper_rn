import React, { useState } from 'react';
import { Text, Alert, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Auth0 from 'react-native-auth0';


import config from './auth0';
import Logo from '../components/Logo';
import GradientBackground from '../components/GradientBackground';

const auth0 = new Auth0(config);

const LoginScreen = () => {
  const [accessToken, setAccessToken] = useState(null);
  
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
      
      <Text className="text-xl font-light tracking-wide text-dark-orange" style={styles.protestGuerrillaRegular}>
        You are{loggedIn ? ' ' : ' not '}logged in.
      </Text>
      <Button
        mode="contained"
        onPress={loggedIn ? onLogout : onLogin}
        disabled={loggedIn}
        className="mt-8 rounded-lg bg-dark-orange"
        labelStyle={{ fontSize: 18, fontWeight: 'bold', color: '#FFF' }}
        contentStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
      >
        {loggedIn ? 'Logout' : 'Login'}
      </Button>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  protestGuerrillaRegular: {
    fontFamily: 'ProtestGuerrilla-Regular',
  },
});

export default LoginScreen;
