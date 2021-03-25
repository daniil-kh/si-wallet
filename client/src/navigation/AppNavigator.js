import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import WalletNavigator from './app/WalletNavigator.js';
import AuthNavigator from './auth/AuthNavigator.js';

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <WalletNavigator />
      {/* <AuthenticationNavigator /> */}
    </NavigationContainer>
  );
};

export default AppNavigator;