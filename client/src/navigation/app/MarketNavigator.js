import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import MarketScreen, {
  screenOptions as marketScreenOptions,
} from '../../screens/app/market/MarketScreen';
import CoinInfoScreen, {
  screenOptions as coinInfoScreenOptions,
} from '../../screens/app/market/CoinInfoScreen';

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

const MarketNavigator = (props) => {
  return (
    <MyStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="Market">
      <MyStackNavigator.Screen
        name="Market"
        component={MarketScreen}
        options={marketScreenOptions}
      />
      <MyStackNavigator.Screen
        name="CoinInfo"
        component={CoinInfoScreen}
        options={coinInfoScreenOptions}
      />
    </MyStackNavigator.Navigator>
  );
};

export default MarketNavigator;
