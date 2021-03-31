import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import LoginScreen, {
  screenOptions as loginScreenOptions,
} from '../../screens/auth/LoginScreen';
import SignUpScreen, {
  screenOptions as signUpScreenOptions,
} from '../../screens/auth/SignUpScreen';

const MyStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.white,
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  headerTintColor: Colors.black,
  ...TransitionPresets.SlideFromRightIOS,
};

const AuthNavigator = (props) => {
  return (
    <MyStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="Login">
      <MyStackNavigator.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <MyStackNavigator.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </MyStackNavigator.Navigator>
  );
};

export default AuthNavigator;
