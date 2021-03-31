import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import CurrencyListWallet from '../../../components/profileScreen/CurrencyListWallet';
import CurrencyCard from '../../../components/profileScreen/CurrencyCard';
import {useSelector} from 'react-redux';

import {CoinsScreenProps} from './types/routing';

const CoinsScreen: React.FC<CoinsScreenProps> = (props) => {
  const wallet = useSelector((state) => state.auth.wallet);
  const type = props.route.params.type;

  const renderCurrencyCard = ({item, index}: {item: any; index: number}) => {
    return (
      <CurrencyCard
        currency={item}
        isActive={true}
        isLast={index === wallet.length - 1 ? true : false}
        onCurrencyPress={() => {
          props.navigation.navigate('Transactions', {
            currency: item,
            type: type,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.screen}>
      <CurrencyListWallet
        currencies={wallet}
        renderCurrencyItem={renderCurrencyCard}
      />
    </View>
  );
};

export const screenOptions = (navData: CoinsScreenProps) => {
  let type = navData.route.params.type;
  return {
    headerTitle: type ? 'Send' : 'Receive',
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/images/backIcon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    paddingVertical: 20,
  },
  optionalText: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: '#72757C',
    marginBottom: 15,
  },
  adressTitle: {
    fontSize: 32,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    marginBottom: 15,
  },
  adressText: {
    fontSize: 14,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: '#72757C',
  },
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

export default CoinsScreen;
