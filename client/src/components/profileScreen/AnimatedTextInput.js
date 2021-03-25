import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TextInput, Text, Animated} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const AnimatedTextInput = (props) => {
  const [isFocused, setFocused] = useState(false);
  const [animatedIsFocused] = useState(
    new Animated.Value(props.value?.length > 0 ? 1 : 0),
  );

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused || props.value?.length > 0 ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isFocused]);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [8, -14],
    }),
    backgroundColor: Colors.blackBackground,
    paddingVertical: 2,
    paddingHorizontal: 2,
    zIndex: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 3],
    }),
  };

  const labelTextStyle = {
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [Colors.placeholder, Colors.greenMain],
    }),
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 13],
    }),
  };

  return (
    <View style={{...props.inputStyle, height: 49, marginBottom: 10}}>
      <TextInput
        {...props}
        style={{
          ...styles.searchField,
          ...props.inputFieldStyle,
          borderColor: !isFocused ? Colors.outlineStroke : Colors.greenMain,
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit
      />
      <Animated.View style={labelStyle}>
        <Animated.Text style={labelTextStyle}>{props.label}</Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchField: {
    borderRadius: 8,
    borderWidth: 0.5,
    padding: 12,
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    marginBottom: 2,
    color: Colors.white,
    zIndex: 2,
  },
});

export default AnimatedTextInput;
