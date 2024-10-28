import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TermsConditionsScreen from './src/screens/TermsConditionsScreen';

// Tabs Bottom unauthenticated

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
          if(route.name === 'SignInScreen'){
            iconName = focused ? 'account-check' : 'account-check-outline';
          }else{
            iconName = focused ? 'account-plus' : 'account-plus-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={size} color={colorFocus} />;
        },
        headerShown: false,
      })}
    >
      <BottomTabs.Screen name="SignInScreen" component={SignInScreen} options={{title: 'Sign In'}}/>
      <BottomTabs.Screen name="SignUpScreen" component={SignUpScreen} options={{title: 'Sign Up'}}/>
      <BottomTabs.Screen name="TermsConditionsScreen" component={TermsConditionsScreen} options={{title: 'Terms & Conditions'}}/>
    </BottomTabs.Navigator>
  )
}

const UnAuthenticatedNavigation = ({ theme }) => <GroupedTabs theme={theme} />;

export default UnAuthenticatedNavigation;