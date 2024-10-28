import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacit,FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import InternalLogo from '../components/InternalLogo';
import { useAxios } from '../context/AxiosContext';
import Patient from '../components/Patient';


const PatientListScreen = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const axios = useAxios();
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('/patients');
        setPatients(response.data);
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const renderPatient = ({ item }) => (
    <Patient patient={item} />
  );

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
    );
  }

  return (
    <GradientBackground>
      <InternalLogo />
      <Text className='text-2xl font-bold text-orange-700 mb-2'>Patient Data</Text>
      <FlatList
        className='w-full p-4 mb-2'
        data={patients}
        keyExtractor={(patient) => patient.id.toString()}
        renderItem={renderPatient}
      />
    </GradientBackground>
  );

}

export default PatientListScreen;
