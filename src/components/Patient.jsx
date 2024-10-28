import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, CommonActions } from '@react-navigation/native';

const getEmergencyIcon = (type) => {
  switch (type) {
    case 'cardiac_arrest':
      return 'heart-pulse';
    case 'trauma':
      return 'ambulance';
    case 'stroke':
      return 'brain';
    case 'respiratory_failure':
      return 'lungs';
    case 'allergic_reaction':
      return 'alert-circle';
    case 'poisoning':
      return 'skull-crossbones';
    case 'burn':
      return 'fire';
    default:
      return 'medical-bag';
  }
};

const Patient = ({ patient }) => {
  const {navigate} = useNavigation()
  return (
  <View className="bg-white border border-orange-400 p-4 rounded-lg mb-4">
    <View className="flex-row items-center mb-2">
      <MaterialCommunityIcons
        name={getEmergencyIcon(patient.emergency_type)}
        size={24}
        color="#FF8C00"
      />
      <Text className="text-lg font-semibold text-orange-700 ml-2">
        {patient.name}
      </Text>
    </View>

    <Text className="text-sm text-gray-700">
      <Text className="font-semibold">Email:</Text> {patient.email}
    </Text>
    <Text className="text-sm text-gray-700">
      <Text className="font-semibold">Responsible:</Text> {patient.responsible}
    </Text>
    <Text className="text-sm text-gray-700">
      <Text className="font-semibold">Phone:</Text> {patient.phone}
    </Text>

    {patient.user && (
      <View className="mt-2">
        <Text className="text-sm text-gray-500 font-semibold">User Info:</Text>
        <Text className="text-sm text-gray-700">
          <Text className="font-semibold">Name:</Text> {patient.user.name}
        </Text>
        <Text className="text-sm text-gray-700">
          <Text className="font-semibold">Email:</Text> {patient.user.email}
        </Text>
      </View>
    )}

    <View className="flex-row space-x-4 mt-4">
      <TouchableOpacity onPress={() => navigate('PatientDataScreen', {patient})} className="flex flex-row flex-1 justify-center items-center p-2 bg-orange-600 rounded-lg">
        <MaterialCommunityIcons name="pencil" size={20} color="white" />
        <Text className="text-white text-sm font-semibold">Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex flex-row flex-1 justify-center items-center p-2 bg-red-600 rounded-lg">
        <MaterialCommunityIcons name="delete" size={20} color="white" />
        <Text className="text-white text-sm font-semibold">Archive</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default Patient;
