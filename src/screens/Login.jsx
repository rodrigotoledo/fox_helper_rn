import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Auth0 } from 'react-native-auth0';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const auth0 = new Auth0({
  domain: 'your-auth0-domain',
  clientId: 'your-client-id',
});

const LoginScreen = () => {
  const handleLogin = async () => {
    try {
      const credentials = await auth0.webAuth.authorize({
        scope: 'openid profile email',
      });
      console.log(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth0.webAuth.clearSession();
      console.log('Logged out');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-light-orange">
      {/* Logo repetido */}
      <FontAwesomeIcon icon='cat' className="w-20 h-20 mb-6 opacity-80" />
      
      <Text className="text-2xl font-bold text-dark-orange mb-4">
        Welcome to the App
      </Text>

      {/* Ações Auth0 */}
      <TouchableOpacity
        className="bg-dark-orange py-2 px-4 rounded-full mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-lg">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-dark-orange py-2 px-4 rounded-full"
        onPress={handleLogout}
      >
        <Text className="text-white text-lg">Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
