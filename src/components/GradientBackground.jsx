import React from 'react';
import { SafeAreaView } from 'react-native';

const GradientBackground = ({ children }) => {
  return (
    <SafeAreaView className='flex h-full items-center justify-start bg-orange-100'>
      {children}
    </SafeAreaView>
  );
};


export default GradientBackground;
