import React, {useState} from 'react';
import {StyleSheet, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const CurrencyList = (props) => {
  return (
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
});

export default CurrencyList;
