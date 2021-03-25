import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const BotRateCard = (props) => {
  const {
    title,
    rentPrice,
    rentTime,
    tradingBalanceDown,
    tradingBalanceUp,
    APY,
  } = props.item;

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <TouchableCmp
      onPress={() => {
        props.setActiveRate(title);
      }}
      style={
        props.activeRate === title
          ? {...styles.activeCard, marginRight: props.cardMargin}
          : {...styles.inActiveCard, marginRight: props.cardMargin}
      }>
      <LinearGradient style={styles.card} colors={Colors.cardInfoGradient}>
        <Text style={styles.cardTitle}>{title}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.infoText}>Rent price: </Text>
          <Text style={styles.infoText}>{rentPrice}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.infoText}>Rent time: </Text>
          <Text style={styles.infoText}>{rentTime}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.infoText}>Trading balance: </Text>
          <Text style={styles.infoText}>
            {tradingBalanceDown + ' - ' + tradingBalanceUp + ' USDT'}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.infoText}>Average APY: </Text>
          <Text style={styles.infoText}>{APY + '%'}</Text>
        </View>
      </LinearGradient>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    height: 152,
    padding: 12,
    paddingTop: 6,
  },
  cardTitle: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  infoText: {
    fontSize: 14,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  activeCard: {
    borderWidth: 1.2,
    borderColor: Colors.greenMain,
    borderRadius: 12,
    width: 255,
    marginRight: 15,
  },
  inActiveCard: {
    borderWidth: 1.2,
    borderColor: 'transparent',
    width: 255,
    marginRight: 15,
  },
});

export default BotRateCard;
