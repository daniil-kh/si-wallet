import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';
import AsyncStorage from '@react-native-community/async-storage';
import * as Global from '../Global';
import * as AuthApi from '../API/AuthAPI';

const StartupScreen = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (!userData) {
          Global.resetNavigationStack(props.navigation, 'Auth');
        }
        const {token, userId} = JSON.parse(userData);

        result = await AuthApi.checkSession(token);

        if (!result) {
          throw new Error('Something went wrong');
        }

        if (result.statusCode === 200) {
          dispatch(authActions.authenticate(userId, token));
          Global.resetNavigationStack(props.navigation, 'TabNavigator');
        } else {
          Global.errorHandler(result);
        }
      } catch (err) {
        dispatch(authActions.logout());
        Global.resetNavigationStack(props.navigation, 'Auth');
      }
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.loadingScreen}>
      <ActivityIndicator size="large" color={Colors.greenMain} />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blackBackground,
  },
});

export const screenOptions = (navData) => {
  return {
    headerTitle: '',
    headerBackground: (props) => (
      <LinearGradient
        colors={Colors.mainGradient}
        style={{flex: 1}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />
    ),
  };
};

export default StartupScreen;
