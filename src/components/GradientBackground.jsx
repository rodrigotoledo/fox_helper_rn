import React from 'react';
import { View } from 'react-native';

const GradientBackground = ({ children }) => {
  return (
    <View className='flex h-full items-center justify-start bg-orange-100'>
      {children}
    </View>
  );
};


export default GradientBackground;
