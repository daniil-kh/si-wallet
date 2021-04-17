import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

import PriceChartThumbnail from './PriceChartThumbnail';

const CoinCard = (props) => {
  const {currency, data} = props;
  console.log(currency)

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
              currency.symbol.toLowerCase() +
              '.png',
          }}
        />
        <View style={{width: 100}}>
          <Text style={styles.menuItemTitle} numberOfLines={1}>
            {currency.symbol}
          </Text>
          <Text
            style={{
              ...styles.profitTitle,
              color:
                currency.metrics.market_data.percent_change_usd_last_24_hours.toFixed(
                  2,
                ) < 0
                  ? Colors.red
                  : Colors.greenMain,
            }}>
            {currency.metrics.market_data.percent_change_usd_last_24_hours.toFixed(
              2,
            ) + '%'}
          </Text>
        </View>
        <View style={styles.chart}>
          <PriceChartThumbnail data={data} />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={styles.currencyPrice}>
              {'$' + currency.metrics.market_data.price_usd.toFixed(2)}
            </Text>
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
  },
  currencyAmount: {
    color: Colors.whiteTitle,
    fontSize: 13,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
  },
  currencyPrice: {
    color: Colors.whiteTitle,
    fontSize: 13,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
  },
  separator: {
    borderColor: Colors.blackStroke,
    borderWidth: 0.7,
    width: '100%',
  },
  chart: {
    width: '25%',
    height: '70%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default CoinCard;
