import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const CoinsList = (props) => {
  const renderCoin = ({item}) => {
    return (
      <TouchableOpacity>
        <View style={styles.menuSection}>
          <Image style={styles.menuItemImage} source={item.image} />
          <View>
            <Text style={styles.menuItemTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.currencyAdress}>{item.change}</Text>
          </View>

          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Text style={styles.currencyAmount}>{currency.price}</Text>
          </View>
        </View>
        {index != props.currencies.length - 1 && (
          <View style={styles.separator}></View>
        )}
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={props.listStyle}
      data={props.coins}
      keyExtractor={(item) => item.id}
      renderItem={renderCoin}
    />
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
    borderColor: Colors.coinOutlineStroke,
    borderWidth: 0.7,
    width: '100%',
  },
});

export default CoinsList;
