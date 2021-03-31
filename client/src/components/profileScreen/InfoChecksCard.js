import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const InfoCard = (props) => {
  const contentList = props.contentList().map((item) => {
    return (
      <View style={styles.menuSection} key={item.title + Math.random()}>
        <Text style={styles.menuItemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={{alignItems: 'flex-end', flex: 1}}>
          {item.value ? (
            <Image
              style={styles.checkImage}
              source={require('../../assets/images/profileScreen/ActiveCheck.png')}
            />
          ) : (
            <Image
              style={styles.checkImage}
              source={require('../../assets/images/profileScreen/InActiveCheck.png')}
            />
          )}
        </View>
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
      <Text style={styles.cardTitle}>{props.title}</Text>
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
    alignItems: 'center',
  },
  menuItemTitle: {
    color: Colors.grayText,
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    width: 98,
  },
  checkImage: {
    width: 16,
    height: 16,
  },
});

export default InfoCard;
