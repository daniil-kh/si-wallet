import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';

import {BotsScreenProps} from './types/routing';

const BotsScreen: React.FC<BotsScreenProps> = (props) => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.blackBackground}}></View>
  );
};

export const screenOptions = (navData: BotsScreenProps) => {
  return {
    headerTitle: 'Bots',
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.navigate('BotsNavigator', {
            screen: 'CreateBot',
            params: {},
          });
        }}>
        <Image
          source={require('../../../assets/images/addIcon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 28,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  backIcon: {
    height: 24,
    width: 24,
    marginLeft: 14,
  },
});

export default BotsScreen;
