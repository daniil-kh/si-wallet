import React from 'react';
import {StyleSheet, View, TouchableOpacity,Text} from 'react-native';
import Colors from '../constants/Colors';

const ErrorScreen = (props) => {
  if (props.isAction) {
    return (
      <View style={styles.screenContainer}>
        <TouchableOpacity onPress={props.onErrorPress}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.errorText}>{props.errorText}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: Colors.blackBackground,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.greenMain,
  },
});

export default ErrorScreen;
