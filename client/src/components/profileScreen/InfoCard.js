import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const InfoCard = (props) => {
  const contentList = props.contentList.map((item, index) => {
    return (
      <View style={styles.menuSection} key={item.title + Math.random()}>
        <Text style={styles.menuItemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{...styles.menuItemValue, ...item.valueStyle}}>
          {item.value}
        </Text>
      </View>
    );
  });

  return (
    <LinearGradient
      style={{
        ...styles.card,
        ...props.cardStyle,
      }}
      colors={Colors.cardInfoGradient}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.cardTitle}>{props.title}</Text>
        {props.isEditEnabled && (
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <TouchableOpacity onPress={props.onEditPress}>
              <Image
                source={require('../../assets/images/profileScreen/editIcon.png')}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {contentList}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderTopRightRadius: 32,
    borderBottomRightRadius: 32,
    height: 204,
    marginRight: 40,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    margin: 20,
    marginLeft: 30,
    marginBottom: 10,
  },
  menuSection: {
    marginHorizontal: 30,
    flexDirection: 'row',
  },
  menuItemTitle: {
    color: Colors.grayText,
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    marginRight: 30,
    width: 130,
  },
  menuItemValue: {
    color: Colors.whiteText,
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
  },
  editIcon: {
    height: 21,
    width: 21,
    marginTop: 33,
    marginRight: 30,
  },
});

export default InfoCard;
