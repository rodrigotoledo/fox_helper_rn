import React from 'react';
import { View, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import Logo from '../components/Logo';
import { useNavigation } from '@react-navigation/native';


const SignOutScreen = ({navigation}) => {

  useFocusEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 2000 });
    translateY.value = withTiming(0, { duration: 2000 });
    const timeoutId = setTimeout(() => {
      removeAuthToken();
    }, 2000);
    return () => clearTimeout(timeoutId);
  });


  const fadeAnim = useSharedValue(0);
  const translateY = useSharedValue(100);

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: translateY.value }],
  }));

  const removeAuthToken = async () => {
    await AsyncStorage.removeItem('authToken');
    navigation.navigate('SignInScreen')
  };

  return (
    <GradientBackground>
      <Logo />
      <Animated.View className='w-full' style={[fadeInStyle]}>
        <View className="w-full flex flex-row space-x-2 items-center justify-center">
          <Text className="text-base text-orange-700">See you soon...</Text>
          <View className="rounded-full bg-orange-50 border-dark-orange border-2 p-2 flex flex-row">
            <MaterialCommunityIcons
              name="account-arrow-right-outline"
              color={'#c2410c'}
              size={50}
            />
            <ActivityIndicator size='large' animating={true} color={'#b33205'} />
          </View>
        </View>
      </Animated.View>
    </GradientBackground>
  );
};

export default SignOutScreen;
