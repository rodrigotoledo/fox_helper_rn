import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import customFont from './CustomFont';

const InternalLogo = () => {
  const navigation = useNavigation()

  return (
    <View className="bg-orange-100 w-full p-2 flex flex-row space-x-2">
      <View className="flex flex-row items-center justify-center space-x-2 bg-orange-100">
        <Icon
          name="paw"
          color="#b33205"
          size={40}
          className="opacity-80"
        />
        <Text className="text-2xl font-light text-strong-dark-orange" style={customFont.protestGuerrillaRegular}>
          FoxHelper!
        </Text>
      </View>
      <Text className="flex-1 text-[12px] text-right">
        Remember, your action can save someone!
        So go directly to the point!
      </Text>
    </View>
  );
};

export default InternalLogo;