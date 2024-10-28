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

// TriageStack

const TriageStack = createStackNavigator()

function TriageStackGroup(){
  return (
    <TriageStack.Navigator screenOptions={{headerShown: false}}>
      <TriageStack.Screen name="HomeScreen" component={HomeScreen} />
      <TriageStack.Screen name="PatientDataScreen" component={PatientDataScreen} />
      <TriageStack.Screen name="MedicalTriageScreen" component={MedicalTriageScreen} />
      <TriageStack.Screen name="EmergencyScreen" component={EmergencyScreen} />
      <TriageStack.Screen name="OwnEmergencyScreen" component={OwnEmergencyScreen} />
    </TriageStack.Navigator>
  )
}


// Tabs Bottom

const BottomTabs = createBottomTabNavigator()

function GroupedTabs({theme}){
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
            iconName = focused ? 'account-check' : 'account-check-outline';
          }else if(route.name === 'UserInfoScreen'){
            iconName = focused ? 'account-check' : 'account-check-outline';
          }else{
            iconName = focused ? 'account-plus' : 'account-plus-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={colorFocus} />;
        },
        headerShown: false,
      })}
    >
      <BottomTabs.Screen name="TriageStackGroup" component={TriageStackGroup} options={{title: 'Triage'}}/>
      <BottomTabs.Screen name="UserInfoScreen" component={UserInfoScreen} options={{title: 'User Info'}}/>
      {/* TODO: adicionar lista e colocar user info no topo */}
      <BottomTabs.Screen name="SignOutScreen" component={SignOutScreen} options={{title: 'Sign out'}}/>
    </BottomTabs.Navigator>
  )
}

const AuthenticatedNavigation = ({ theme }) => <GroupedTabs theme={theme} />;

export default AuthenticatedNavigation;