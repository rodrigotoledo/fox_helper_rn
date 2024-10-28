import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './src/screens/HomeScreen';
import UserInfoScreen from './src/screens/UserInfoScreen';
import SignOutScreen from './src/screens/SignOutScreen';
import OwnEmergencyScreen from './src/screens/OwnEmergencyScreen';
import EmergencyScreen from './src/screens/EmergencyScreen';
import MedicalTriageScreen from './src/screens/MedicalTriageScreen';
import PatientDataScreen from './src/screens/PatientDataScreen';
import {UnGroupedTabs} from './UnAuthenticatedNavigation';
import theme from './theme';
import PatientListScreen from './src/screens/PatientListScreen';
import SignInScreen from './src/screens/SignInScreen';



// TriageStack

const TriageStack = createStackNavigator()


function TriageStackGroup(){
  return (
    <TriageStack.Navigator screenOptions={{headerShown: false}}>
      <TriageStack.Screen name="PatientListScreen" component={PatientListScreen} />
      <TriageStack.Screen name="PatientDataScreen" component={PatientDataScreen} />
    </TriageStack.Navigator>
  )
}

// Sign Out Stack
const SignOutStack = createStackNavigator()
function SignOutStackGroup(){
  return (
    <SignOutStack.Navigator screenOptions={{headerShown: false}}>
      <SignOutStack.Screen name="SignOutScreen" component={SignOutScreen} />
      <SignOutStack.Screen name="SignInScreen" component={SignInScreen} />
    </SignOutStack.Navigator>
  )
}


// Tabs Bottom

const BottomTabs = createBottomTabNavigator()

export function AuthGroupedTabs(){
  return(
    <BottomTabs.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'semibold',
          
        },
        tabBarStyle: {
          backgroundColor: '#fff7ed',
          borderTopWidth: 0
        },
        tabBarActiveTintColor: theme.colors.active,
        tabBarInactiveTintColor: theme.colors.inActive,
        tabBarIcon: ({focused, size}) => {
          let iconName;
          let colorFocus;
          colorFocus = focused ? theme.colors.active : theme.colors.inActive;
          if(route.name === 'TriageStackGroup'){
            iconName = focused ? 'stethoscope' : 'stethoscope';
          }else if(route.name === 'MedicalTriageScreen'){
            iconName = focused ? 'hospital-box' : 'hospital-box';
          }else if(route.name === 'EmergencyScreen'){
            iconName = focused ? 'ambulance' : 'ambulance';}
          else if(route.name === 'OwnEmergencyScreen'){
            iconName = focused ? 'account-injury' : 'account-injury';
          }else{
            iconName = focused ? 'alert-circle' : 'alert-circle';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={colorFocus} />;
        },
        headerShown: false,
      })}
    >
      <BottomTabs.Screen name="TriageStackGroup" component={TriageStackGroup} options={{title: 'Patient Data'}}/>
      <BottomTabs.Screen name="EmergencyScreen" component={EmergencyScreen} options={{title: 'Emergency'}}/>
      <BottomTabs.Screen name="OwnEmergencyScreen" component={OwnEmergencyScreen} options={{title: 'Own Emergency'}}/>
      <BottomTabs.Screen name="SignOutStackGroup" component={SignOutStackGroup} options={{title: 'Sign Out'}}/>
    </BottomTabs.Navigator>
  )
}

const AuthenticatedNavigation = () => <AuthGroupedTabs />;

export default AuthenticatedNavigation;