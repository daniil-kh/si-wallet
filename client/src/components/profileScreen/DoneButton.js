import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const DoneButton = (props) => {
  return (
    <TouchableOpacity
      style={{...styles.button, ...props.buttonStyle}}
      onPress={props.onPress}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.greenMain,
    height: 47,
    justifyContent: 'center',
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    alignItems: 'flex-end',
    marginRight: 42,
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    fontSize: 24,
    marginRight: 30,
    marginBottom: 5,
  },
});

export default DoneButton;
