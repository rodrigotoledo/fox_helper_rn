// theme.js
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF8C00',
    accent: '#FFD580',
    background: '#FFF4E5',
    surface: '#FFF',
    text: '#333',
    placeholder: '#900',
    error: '#D32F2F',
    active: '#c4461c',
    inActive: '#ffbeaa',
  }
};

export default theme;
