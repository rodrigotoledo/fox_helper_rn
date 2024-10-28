import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InternalLogo from '../components/InternalLogo';

const HomeScreen = ({navigation}) => {
  const [expanded, setExpanded] = useState(true);
  // const navigation = useNavigation()

  return (
  <GradientBackground>
    <InternalLogo />
    <View className="flex-1 justify-center items-center bg-orange-100 p-4">
      
      {/* Primeira linha */}
      <View className="flex-row justify-between w-full mb-4">
        {/* Diagnose */}
        <TouchableOpacity 
          className="w-40 h-40 bg-orange-500 rounded-lg justify-center items-center shadow-lg"
          activeOpacity={0.8}  // Leve opacidade ao clicar
          onPress={() => navigation.navigate({name: 'PatientDataScreen'})}
        >
          <MaterialCommunityIcons name="stethoscope" size={40} color="white" />
          <Text className="text-neutral-50 mt-2">Patient Data</Text>
        </TouchableOpacity>

        {/* Medical Triage */}
        <TouchableOpacity 
          className="w-40 h-40 bg-orange-600 rounded-lg justify-center items-center shadow-lg"
          activeOpacity={0.8} 
          onPress={() => CommonActions.navigate('MedicalTriageScreen')}
        >
          <MaterialCommunityIcons name="hospital-box" size={40} color="white" />
          <Text className="text-neutral-50 mt-2">Medical Triage</Text>
        </TouchableOpacity>
      </View>

      {/* Segunda linha */}
      <View className="flex-row justify-between w-full">
        {/* Emergency */}
        <TouchableOpacity 
          className="w-40 h-40 bg-orange-700 rounded-lg justify-center items-center shadow-lg"
          activeOpacity={0.8} 
          onPress={() => navigation.navigate('EmergencyScreen')}
        >
          <MaterialCommunityIcons name="ambulance" size={40} color="white" />
          <Text className="text-neutral-50 mt-2">Emergency</Text>
        </TouchableOpacity>

        {/* Own Emergency */}
        <TouchableOpacity 
          className="w-40 h-40 bg-orange-800 rounded-lg justify-center items-center shadow-lg"
          activeOpacity={0.8} 
          onPress={() => navigation.navigate('OwnEmergencyScreen')}
        >
          <MaterialCommunityIcons name="alert-circle" size={40} color="white" />
          <Text className="text-neutral-50 mt-2">Own Emergency</Text>
        </TouchableOpacity>
      </View>
    </View>
  </GradientBackground>
  )
}

export default HomeScreen;
