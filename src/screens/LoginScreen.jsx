import React, { useState } from 'react';
import { Text, Alert } from 'react-native';
import { Button, Icon } from 'react-native-paper';
import Auth0 from 'react-native-auth0';
import config from './auth0';
import customFont from '../components/CustomFont';
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
      
      <Text className="text-xl font-thin text-orange-500" style={customFont.protestRiotRegular}>
        Você ainda não está logado...
      </Text>
      <Button
        mode="text"
        size={20}
        icon={({ size, color }) => (
          <Icon source="account-arrow-right" size={30} color='#FFFFFF' />
        )}
        onPress={loggedIn ? onLogout : onLogin}
        disabled={loggedIn}
        className="mt-8 rounded-lg bg-dark-orange"
        contentStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
      >
        <Text className="text-white text-xl" style={customFont.protestRiotRegular}>{loggedIn ? 'Sair' : 'Entrar'}</Text>
      </Button>
    </GradientBackground>
  );
}


export default LoginScreen;
