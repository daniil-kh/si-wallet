import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import Colors from '../constants/Colors';

const LoadingScreen = (props) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.blackBackground}}>
      <ActivityIndicator size="large" color={Colors.greenMain} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default LoadingScreen;
