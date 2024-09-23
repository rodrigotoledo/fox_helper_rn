import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const Logo = () => {
  return (
    <View className="flex justify-center items-center p-5">
      
      <Icon
        name="paw"
        color="#b33205" // Cor laranja escura
        size={100}
        className="mb-4 opacity-80"
      />
      <Text className="text-2xl font-bold text-dark-orange mb-4 font-protest">
        FoxHelper! Aqui VOCÊ é cuidado.
      </Text>
    </View>
  );
};

export default Logo;
