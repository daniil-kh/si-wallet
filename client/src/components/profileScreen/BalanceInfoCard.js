import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const BalanceInfoCard = (props) => {
  return (
    <LinearGradient
      style={{
        ...styles.card,
        ...props.cardStyle,
      }}
      colors={Colors.cardInfoGradient}>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginTop: 20}}>
          <Text style={styles.subTitleInfo}>{props.firstTitle}</Text>
          <Text style={styles.titleInfo}>{props.balance}</Text>
        </View>
        <View style={{alignItems: 'flex-end', flex: 1, marginVertical: 20}}>
          <Text style={styles.subTitleInfo}>{props.secondTitle}</Text>
          <Text
            style={{
              ...styles.profitInfo,
              color: props.dayChange > 0 ? Colors.greenMain : Colors.red,
            }}>
            {'$' + props.dayChange}
          </Text>
          <Text
            style={{
              ...styles.profitInfo,
              color: props.dayChange > 0 ? Colors.greenMain : Colors.red,
            }}>
            {props.dayChangePercent + '%'}
          </Text>
        </View>
      </View>
      {props.isButtonsActive && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.firstButton}
            onPress={props.onSendPress}>
            <Text style={styles.buttonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondButton}
            onPress={props.onReceivePress}>
            <Text style={styles.buttonText}>Receive</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    height: 194,
    marginRight: 40,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
    paddingHorizontal: 20,
  },
  subTitleInfo: {
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.grayMain,
  },
  titleInfo: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
  },
  profitInfo: {
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.greenMain,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 22,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
  },
  firstButton: {
    backgroundColor: Colors.greenMain,
    width: '48%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    marginRight: 8,
  },
  secondButton: {
    backgroundColor: Colors.greenMain,
    width: '48%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
  },
});

export default BalanceInfoCard;
