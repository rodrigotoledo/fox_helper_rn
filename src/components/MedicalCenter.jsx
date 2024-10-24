import RNPickerSelect from 'react-native-picker-select';

export const MedicalCenter = () => {
  return (
    <RNPickerSelect
      onValueChange={(value) => console.log(value)}
      useNativeAndroidPickerStyle={false}  // Para customização completa no Android
      style={{
        inputIOS: {
          marginHorizontal: 10,
          padding: 10,
          backgroundColor: '#ffffff',
          color: '#000000', // Cor do texto
          borderRadius: 10, // Borda arredondada
          borderColor: '#b33205',
          borderWidth: 1,
        },
        inputAndroid: {
          marginHorizontal: 10,
          padding: 10,
          backgroundColor: '#ffffff',
          color: '#000000', // Cor do texto
          borderRadius: 10, // Borda arredondada
          borderColor: '#b33205',
          borderWidth: 1,
        },
        iconContainer: {
          top: 10,
          right: 12,
        },
      }}
      items={[
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
      ]}
    />
  );
};
