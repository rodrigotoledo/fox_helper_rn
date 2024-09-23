/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
if (__DEV__) {
  require("./ReactotronConfig");
}
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';

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
  }
};

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <AuthProvider>
          <AppNavigation />
        </AuthProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

export default App;
