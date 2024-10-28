import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import GradientBackground from '../components/GradientBackground';
import InternalLogo from '../components/InternalLogo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PatientDataScreen = ({navigation}) => {

  // States to manage form fields
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');

  // Example function to submit the data to the server
  const handleSubmit = async () => {
    const patientData = { name, dob, height };
    try {
      const response = await fetch('https://your-api-endpoint.com/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Patient data submitted successfully');
        // Clear form or navigate to another screen
      } else {
        alert('Failed to submit patient data');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred while submitting data');
    }
  };

  return (
    <GradientBackground>
      <InternalLogo />
      <Text className='text-2xl font-bold text-orange-700 mb-2'>Patient Registration</Text>
      <ScrollView className='w-full p-4 mb-2'>
        <View className="flex flex-col w-full h-full">
          <TextInput
            activeOutlineColor='#b33205'
            outlineColor='#b33205'
            className="text-gray-600 bg-orange-50"
            value={name}
            label="Name"
            onChangeText={(text) => setName(text)}
            mode='outlined'
            placeholder="Type patient full name"
          />


          <TextInput
            activeOutlineColor='#b33205'
            outlineColor='#b33205'
            className="text-gray-600 bg-orange-50"
            value={dob}
            label="Date of Birth"
            onChangeText={text => setDob(text)}
            mode='outlined'
            placeholder="Type patient birthday DD/MM/YYYY"
          />

          <TextInput
            activeOutlineColor='#b33205'
            outlineColor='#b33205'
            className="text-gray-600 bg-orange-50"
            label="Height"
            value={height}
            onChangeText={text => setHeight(text)}
            mode="outlined"
            keyboardType="numeric"
            placeholder="Height in cm"
          />

          <View className="flex flex-row w-full justify-around my-4">
            <TouchableOpacity
              onPress={handleSubmit}
              className="rounded-full w-40 h-16 justify-center items-center bg-dark-orange"
              >
              <MaterialCommunityIcons
                name="content-save"
                size={32}
                color="white"
              />
              <Text className='text-white text-center font-bold'>
                Save Information
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="rounded-full w-40 h-16 justify-center items-center bg-dark-orange"
              >
              <MaterialCommunityIcons
                name="record-rec"
                size={32}
                color="white"
              />
              <Text className='text-white text-center font-bold'>
                Save by Voice
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default PatientDataScreen;
