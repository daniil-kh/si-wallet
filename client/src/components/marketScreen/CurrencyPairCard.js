import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const CurrencyPairCard = (props) => {
  const {pair, percent_change, price, price_usd} = props.item;

  return (
    <LinearGradient style={styles.card} colors={Colors.cardInfoGradient}>
      <View>
        <View
          style={{flexDirection: 'row', marginBottom: 8, alignItems: 'center'}}>
          <Text style={styles.cardTitle}>{pair}</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text
              style={{
                ...styles.infoText,
                color: percent_change > 0 ? Colors.greenMain : Colors.red,
              }}>
              {percent_change.toFixed(2) + '%'}
            </Text>
          </View>
        </View>
      </View>
      <Text
        style={{
          ...styles.priceText,
          color: percent_change > 0 ? Colors.greenMain : Colors.red,
        }}>
        {price.toFixed(2)}
      </Text>
      <Text style={styles.infoText}>{price_usd.toFixed(2)}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 12,
    paddingTop: 6,
    borderRadius: 12,
    marginRight: 10,
    width: 148,
    height: 115,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 14,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  infoText: {
    fontSize: 12,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: '#808184',
  },
  priceText: {
    fontSize: 19,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    marginBottom: 5,
  },
});

export default CurrencyPairCard;
