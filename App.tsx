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
import {
  SafeAreaView
} from 'react-native';
import LoginScreen from './src/screens/Login';

function App(): React.JSX.Element {

  return (
    <SafeAreaView>
      <LoginScreen />
    </SafeAreaView>
  );
}

export default App;
