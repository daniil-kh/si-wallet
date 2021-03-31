import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import DiscoveryScreen, {
  screenOptions as discoveryScreenOptions,
} from '../../screens/app/discovery/DiscoveryScreen';
import NewsInfoScreen, {
  screenOptions as newsInfoScreenOptions,
} from '../../screens/app/discovery/NewsInfoScreen';

const MyStackNavigator = createStackNavigator();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.headerBackground,
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  headerTintColor: Colors.black,
  ...TransitionPresets.SlideFromRightIOS,
};

const DiscoveryNavigator = (props) => {
  return (
    <MyStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="News">
      <MyStackNavigator.Screen
        name="Discovery"
        component={DiscoveryScreen}
        options={discoveryScreenOptions}
      />
      <MyStackNavigator.Screen
        name="NewsInfo"
        component={NewsInfoScreen}
        options={newsInfoScreenOptions}
      />
    </MyStackNavigator.Navigator>
  );
};

export default DiscoveryNavigator;
