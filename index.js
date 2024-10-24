/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {queryClient, QueryClientProvider} from './queryClient';
import { AxiosProvider } from './src/context/AxiosContext';

const RootComponent = () => (
  <QueryClientProvider client={queryClient}>
    <AxiosProvider>
      <App />
    </AxiosProvider>
  </QueryClientProvider>
);

AppRegistry.registerComponent(appName, () => RootComponent);