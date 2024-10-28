import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
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
      <ScrollView className='bg-orange-100 w-full px-2'>
        <View className="flex flex-col w-full h-full">
          <Text>Patient Registration</Text>

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

          <View className="flex flex-row h-40 w-full justify-between">
            <Button
  mode="contained"
  onPress={handleSubmit}
  contentStyle={{ height: 160, width: 160 }} // Ajusta o tamanho do botão
  className="rounded-full justify-center items-center"
>
  {/* Estrutura interna do botão para organizar o texto acima do ícone */}
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 18, color: 'white', marginBottom: 4 }}>
      Save Information
    </Text>
    <MaterialCommunityIcons
      name="chevron-double-down"
      size={32} // Tamanho do ícone
      color="white" // Cor do ícone
    />
  </View>
</Button>

<Button
  mode="contained"
  onPress={handleSubmit}
  contentStyle={{ height: 160, width: 160 }} // Ajusta o tamanho do botão
  className="rounded-full justify-center items-center"
>
  {/* Estrutura interna do botão para organizar o texto acima do ícone */}
  <View style={{ alignItems: 'center' }}>
    <Text style={{ fontSize: 18, color: 'white', marginBottom: 4 }}>
      Record by Voice
    </Text>
    <MaterialCommunityIcons
      name="record-rec"
      size={32} // Tamanho do ícone
      color="white" // Cor do ícone
    />
  </View>
</Button>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
};

export default PatientDataScreen;
