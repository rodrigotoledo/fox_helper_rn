/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {queryClient, QueryClientProvider} from './queryClient';
import axios from 'axios';
axios.defaults.baseURL = process.env.API_DOMAIN;

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);