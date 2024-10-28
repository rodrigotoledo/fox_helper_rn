import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TermsConditionsScreen from './src/screens/TermsConditionsScreen';
import {AuthGroupedTabs} from './AuthenticatedNavigation';
import theme from './theme';


// Sign In Stack

const SignInStack = createStackNavigator()

function SignInStackGroup(){
  return (
    <SignInStack.Navigator screenOptions={{headerShown: false}}>
      <SignInStack.Screen name="SignInScreen" component={SignInScreen} />
      <SignInStack.Screen name="AuthGroupedTabs" component={AuthGroupedTabs} />
    </SignInStack.Navigator>
  )
}

// Sign Up Stack

const SignUpStack = createStackNavigator()

function SignUpStackGroup(){
  return (
    <SignUpStack.Navigator screenOptions={{headerShown: false}}>
      <SignUpStack.Screen name="SignUpScreen" component={SignUpScreen} />
      <SignUpStack.Screen name="AuthGroupedTabs" component={AuthGroupedTabs} />
    </SignUpStack.Navigator>
  )
}

// Tabs Bottom

const BottomTabs = createBottomTabNavigator()

export function UnGroupedTabs(){
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
      <BottomTabs.Screen name="SignInStackGroup" component={SignInStackGroup} options={{title: 'Sign In'}}/>
      <BottomTabs.Screen name="SignUpStackGroup" component={SignUpStackGroup} options={{title: 'Sign Up'}}/>
      <BottomTabs.Screen name="TermsConditionsScreen" component={TermsConditionsScreen} options={{title: 'Terms & Conditions'}}/>
    </BottomTabs.Navigator>
  )
}

const UnAuthenticatedNavigation = () => <UnGroupedTabs />;

export default UnAuthenticatedNavigation;