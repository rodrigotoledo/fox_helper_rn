import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      start={{ x: 0.0, y: 0 }}
      end={{ x: 0.0, y: 1.0 }}
      colors={['#f0c2a1', '#ffe9d9']}
      className='flex flex-1 h-full items-center justify-center'
    >
      {children}
    </LinearGradient>
  );
};


export default GradientBackground;
