import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InternalLogo from '../components/InternalLogo';


const UserInfoScreen = ({navigation}) => (
  <GradientBackground>
    <InternalLogo />
    <ScrollView>
      <Text>something here</Text>
    </ScrollView>
  </GradientBackground>
);


export default UserInfoScreen;
