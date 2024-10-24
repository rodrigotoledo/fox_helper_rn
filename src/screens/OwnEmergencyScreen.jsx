import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import GradientBackground from '../components/GradientBackground';
import InternalLogo from '../components/InternalLogo';


const OwnEmergencyScreen = ({navigation}) => (
  <GradientBackground>
    <InternalLogo />
    <ScrollView>
      <Text>something here</Text>
    </ScrollView>
  </GradientBackground>
);

export default OwnEmergencyScreen;
