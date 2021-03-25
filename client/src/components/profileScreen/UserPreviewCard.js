import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const UserPreviewCard = (props) => {
  return (
    <LinearGradient
      style={{
        ...styles.card,
        ...props.cardStyle,
        height: props.isButtonsEnabled ? 220 : 160
      }}
      colors={Colors.cardInfoGradient}>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Image
          source={require('../../assets/images/profileScreen/userImage.png')}
          style={styles.userImage}
        />
        <View style={{justifyContent: 'flex-end', marginBottom: 12}}>
          <Text style={{...styles.userInfo, fontSize: 22}} numberOfLines={1}>
            {props.userName}
          </Text>
          <Text style={styles.userInfo}>{'$ ' + props.userBalance}</Text>
        </View>
      </View>
      {props.isButtonsEnabled && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.firstButton}
            onPress={props.onWalletPress}>
            <Text style={styles.buttonText}>Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondButton}
            onPress={props.onManageProfilePress}>
            <Text style={styles.buttonText}>Manage profile</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 0,
    borderRadius: 32,
    marginRight: 40,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    elevation: 2,
    padding: 20,
  },
  userInfo: {
    fontSize: 17,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    width: 196
  },
  userImage: {
    width: 107,
    height: 107,
    marginRight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingLeft: 4,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
  },
  firstButton: {
    backgroundColor: Colors.greenMain,
    width: '33%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    marginRight: 8,
  },
  secondButton: {
    backgroundColor: Colors.greenMain,
    width: '60%',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
  },
});

export default UserPreviewCard;
