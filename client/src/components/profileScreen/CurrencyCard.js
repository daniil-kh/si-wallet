import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const CurrencyCard = (props) => {
  const {currency} = props;
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.isActive) {
          props.onCurrencyPress();
        }
      }}>
      <View style={styles.menuSection}>
        <Image
          style={styles.menuItemImage}
          source={{
            uri:
              Global.SERVER_ADDRESS +
              Global.IMAGES_REPO +
              currency.main_data.data.symbol.toLowerCase() +
              '.png',
          }}
        />
        <View>
          <View style={{flexDirection: props.isMarket ? 'column' : 'row'}}>
            <Text style={styles.menuItemTitle} numberOfLines={1}>
              {currency.main_data.data.name}
            </Text>
            <Text
              style={{
                ...styles.profitTitle,
                color:
                  currency.percent_change_usd_last_24_hours.toFixed(2) < 0
                    ? Colors.red
                    : Colors.greenMain,
              }}>
              {currency.percent_change_usd_last_24_hours.toFixed(2) + '%'}
            </Text>
          </View>
          <Text style={styles.currencyAdress}>
            {currency.balances[0].address.slice(0, 9) +
              '...' +
              currency.balances[0].address.slice(25)}
          </Text>
        </View>

        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View>
            <View style={{alignItems: 'flex-end'}}>
              <Text style={styles.currencyAmount}>
                {currency.available_balance}
              </Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={{
                  ...styles.currencyPrice,
                  color: props.isMarket ? Colors.whiteTitle : Colors.adressGray,
                }}>
                {'$' + currency.price_usd.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {!props.isLast && <View style={styles.separator}></View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default CurrencyCard;
