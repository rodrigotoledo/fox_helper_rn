import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import customFont from './CustomFont';

const Logo = () => {
  return (
    <View className="flex justify-center items-center p-5 space-y-4">
      <Icon
        name="paw"
        color="#b33205"
        size={100}
        className="opacity-80"
      />
      <Text className="text-4xl font-light text-dark-orange" style={customFont.protestGuerrillaRegular}>
        FoxHelper!
      </Text>
      <Text className="text-3xl font-light text-dark-orange" style={customFont.protestRiotRegular}>
        Aqui VOCÊ é cuidado.
      </Text>
    </View>
  );
};

export default Logo;
