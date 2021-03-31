import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const CurrencyListWallet = (props) => {
  return (
    <LinearGradient
      style={{
        ...styles.card,
        ...props.cardStyle,
      }}
      colors={Colors.cardInfoGradient}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={props.cardStyle}
        data={props.currencies}
        keyExtractor={(item) =>
          props.isMarket ? item.id : item.main_data.data.id
        }
        renderItem={props.renderCurrencyItem}
        ListHeaderComponent={props.header}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    marginRight: 40,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
  },
  list: {},
  menuSection: {
    marginLeft: 16,
    marginRight: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 63,
  },
  menuItemImage: {
    height: 42,
    width: 42,
    marginRight: 10,
    marginTop: 4,
  },
  currencyAdress: {
    color: Colors.adressGray,
    fontSize: 10,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
  },
  menuItemTitle: {
    color: Colors.whiteTitle,
    fontSize: 18,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    marginRight: 8,
  },
  profitTitle: {
    color: Colors.greenMain,
    fontSize: 10,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    marginTop: 8,
  },
  currencyAmount: {
    color: Colors.whiteTitle,
    fontSize: 13,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
  },
  currencyPrice: {
    color: Colors.adressGray,
    fontSize: 13,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
  },
  separator: {
    borderColor: Colors.blackStroke,
    borderWidth: 0.7,
    width: '100%',
  },
});

export default CurrencyListWallet;
