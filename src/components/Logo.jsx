import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';
import customFont from './CustomFont';

const Logo = () => {
  const scaleIcon = useSharedValue(0.5);
  const scaleText1 = useSharedValue(0.5);
  const scaleText2 = useSharedValue(0.5);

  useEffect(() => {
    scaleIcon.value = withTiming(1, { duration: 800 });
    scaleText1.value = withTiming(1, { duration: 800, delay: 200 });
    scaleText2.value = withTiming(1, { duration: 800, delay: 400 });
  }, []);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleIcon.value }],
    };
  });

  const textStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleText1.value }],
    };
  });

  const textStyle2 = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleText2.value }],
    };
  });

  return (
    <View className="flex justify-center items-center p-5 space-y-4">
      <Animated.View style={iconStyle}>
        <Icon
          name="paw"
          color="#b33205"
          size={100}
          className="opacity-80"
        />
      </Animated.View>

      <Animated.View style={textStyle1}>
        <Text className="text-4xl font-light text-dark-orange" style={customFont.protestGuerrillaRegular}>
          FoxHelper!
        </Text>
      </Animated.View>

      <Animated.View style={textStyle2}>
        <Text className="text-3xl font-light text-dark-orange" style={customFont.protestRiotRegular}>
          Aqui VOCÊ é cuidado.
        </Text>
      </Animated.View>
    </View>
  );
};

export default Logo;
