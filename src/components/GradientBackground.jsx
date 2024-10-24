import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0 }}
      end={{ x: 0.0, y: 1.0 }}
      colors={['#f0c2a1', '#ffe9d9']}
      className='flex h-full items-center justify-start'
    >
      {children}
    </LinearGradient>
  );
};


export default GradientBackground;
