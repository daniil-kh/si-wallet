import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';
import * as Global from '../Global';

const ButtonComponent = (props) => {
  return (
    <View
      style={{
        padding: 8,
        ...props.buttonContainerStyle,
      }}>
      <TouchableOpacity
        style={{...styles.button, ...props.buttonStyle}}
        onPress={props.onPress}>
        <Text style={{...styles.buttonText, ...props.buttonTextStyle}}>
          {props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.greenMain,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    fontSize: 18,
  },
});

export default ButtonComponent;
