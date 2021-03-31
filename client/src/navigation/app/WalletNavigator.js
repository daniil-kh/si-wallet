import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import TabNavigator, {screenOptions as tabScreenOptions} from './TabNavigator';
import ProfileNavigator from './ProfileNavigator';
import DiscoveryNavigator from './DiscoveryNavigator';
import MarketNavigator from './MarketNavigator';
import BotsNavigator from './BotsNavigator';
import AuthNavigator from '../auth/AuthNavigator';
import Colors from '../../constants/Colors';
import StartupScreen from '../../screens/StartupScreen';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import * as Global from '../../Global';

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

const WalletNavigator = (props) => {
  return (
    <MyStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="TabNavigator">
      <MyStackNavigator.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{headerShown: false}}
      />
      <MyStackNavigator.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={({route, navigation}) => ({
          headerTitle: getHeaderTitle(route),
          headerTitleStyle: styles.headerTitle,
          headerTitleAlign: 'center',
          headerRight:
            getHeaderTitle(route) === 'Bots'
              ? (props) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('BotsNavigator', {
                        screen: 'CreateBot',
                        params: {},
                      });
                    }}>
                    <Image
                      source={require('../../assets/images/addIcon.png')}
                      style={styles.addIcon}
                    />
                  </TouchableOpacity>
                )
              : null,
        })}
      />
      <MyStackNavigator.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{headerShown: false}}
      />
      <MyStackNavigator.Screen
        name="DiscoveryNavigator"
        component={DiscoveryNavigator}
        options={{headerShown: false}}
      />
      <MyStackNavigator.Screen
        name="MarketNavigator"
        component={MarketNavigator}
        options={{headerShown: false}}
      />
      <MyStackNavigator.Screen
        name="BotsNavigator"
        component={BotsNavigator}
        options={{headerShown: false}}
      />
      <MyStackNavigator.Screen
        name="Auth"
        component={AuthNavigator}
        options={{headerShown: false}}
      />
    </MyStackNavigator.Navigator>
  );
};

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Profile';

  switch (routeName) {
    case 'Bots':
      return 'Bots';
    case 'Market':
      return 'Market';
    case 'Discovery':
      return 'Discovery';
    case 'Profile':
      return 'Profile';
  }
}

const styles = StyleSheet.create({
  addIcon: {
    height: 24,
    width: 24,
    marginRight: 13,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
});

export default WalletNavigator;
