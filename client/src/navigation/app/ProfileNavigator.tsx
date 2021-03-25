import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import Colors from '../../constants/Colors';
import ProfileScreen, {
  screenOptions as profileScreenOptions,
} from '../../screens/app/profile/ProfileScreen';
import EditProfileScreen, {
  screenOptions as editProfileScreenOptions,
} from '../../screens/app/profile/EditProfileScreen';
import WalletScreen, {
  screenOptions as walletScreenOptions,
} from '../../screens/app/profile/WalletScreen';
import EnterUserInfoScreen, {
  screenOptions as enterUserInfoScreenOptions,
} from '../../screens/app/profile/EnterUserInfoScreen';
import TransactionScreen, {
  screenOptions as transactionScreenOptions,
} from '../../screens/app/profile/TransactionScreen';
import CoinsScreen, {
  screenOptions as coinsScreenOptions,
} from '../../screens/app/profile/CoinsScreen';

import {ProfileParamList} from '../../screens/app/profile/types/routing';

const MyStackNavigator = createStackNavigator<ProfileParamList>();

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.headerBackground,
  },
  headerTitleStyle: {},
  headerBackTitleStyle: {},
  headerTintColor: Colors.black,
  ...TransitionPresets.SlideFromRightIOS,
};

const ProfileNavigator: React.FC = (props) => {
  return (
    <MyStackNavigator.Navigator
      screenOptions={defaultNavOptions}
      initialRouteName="Profile">
      <MyStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={profileScreenOptions}
      />
      <MyStackNavigator.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={editProfileScreenOptions}
      />
      <MyStackNavigator.Screen
        name="EnterUserInfo"
        component={EnterUserInfoScreen}
        options={enterUserInfoScreenOptions}
      />
      <MyStackNavigator.Screen
        name="Wallet"
        component={WalletScreen}
        options={walletScreenOptions}
      />
      <MyStackNavigator.Screen
        name="Transactions"
        component={TransactionScreen}
        options={transactionScreenOptions}
      />
      <MyStackNavigator.Screen
        name="Coins"
        component={CoinsScreen}
        options={coinsScreenOptions}
      />
    </MyStackNavigator.Navigator>
  );
};

export default ProfileNavigator;
