import React, {useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const DefaultTextInput = (props) => {
  return (
    <View style={{...props.inputStyle, height: 49, marginBottom: 10}}>
      <TextInput
        {...props}
        style={{...styles.searchField, ...props.inputFieldStyle}}
        height={49}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchField: {
    borderRadius: 8,
    borderWidth: 0.5,
    padding: 12,
    borderColor: Colors.outlineStroke,
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    backgroundColor: Colors.blackBackground,
    marginBottom: 2,
    flex: 1,
    height: 49,
    color: Colors.white
  },
});

export default DefaultTextInput;
