import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen, {
  screenOptions as profileScreenOptions,
} from '../../screens/app/profile/ProfileScreen';
import DiscoveryScreen from '../../screens/app/discovery/DiscoveryScreen';
import BotsScreen from '../../screens/app/bots/BotsScreen';
import MarketScreen from '../../screens/app/market/MarketScreen';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const TabNavigator = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="Profile"
      keyboardHidesTabBar={true}
      screenOptions={tabScreenOptions}
      tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name="Bots"
        component={BotsScreen}
        options={{tabBarLabel: 'Bots'}}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarLabel: 'Market',
        }}
      />
      <Tab.Screen
        name="Discovery"
        component={DiscoveryScreen}
        options={{tabBarLabel: 'Discovery'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

const tabScreenOptions = ({route}) => ({
  tabBarIcon: ({focused, color, size}) => {
    let icon;
    switch (route.name) {
      case 'Bots':
        icon = (
          <Image
            source={require('../../assets/images/tabBar/bot.png')}
            style={styles.tabNavigatorFrame}
          />
        );
        break;
      case 'Market':
        icon = (
          <Image
            source={require('../../assets/images/tabBar/stock-market.png')}
            style={styles.tabNavigatorFrame}
          />
        );
        break;
      case 'Discovery':
        icon = (
          <Image
            source={require('../../assets/images/tabBar/earth-globe.png')}
            style={styles.tabNavigatorFrame}
          />
        );
        break;
      case 'Profile':
        icon = (
          <Image
            source={require('../../assets/images/tabBar/wallet.png')}
            style={styles.tabNavigatorFrame}
          />
        );
        break;
    }
    return icon;
  },
});

const tabBarOptions = {
  activeTintColor: Colors.greenMain,
  inactiveTintColor: Colors.white,
  activeBackgroundColor: Colors.tabBackground,
  inactiveBackgroundColor: Colors.tabBackground,
  labelStyle: {
    fontSize: 11,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    marginBottom: 5,
  },
  style: {
    height: 56,
  },
  tabStyle: {
    paddingTop: 10,
  },
  keyboardHidesTabBar: true,
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'Profile',
    headerTitleStyle: {
      fontSize: 28,
      fontFamily: Global.fonts.BALSAMIQ_BOLD,
      color: Colors.whiteTitle,
    },
    headerTitleAlign: 'center',
    
  };
};

const styles = StyleSheet.create({
  tabNavigatorFrame: {
    height: 18,
    width: 18,
  },
});

export default TabNavigator;
