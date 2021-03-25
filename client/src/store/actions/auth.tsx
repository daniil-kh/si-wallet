import AsyncStorage from '@react-native-community/async-storage';
import {ActionCreator} from 'redux';
import {
  AUTHENTICATE,
  SET_USER_INFO,
  SET_USER_BALANCE,
  SET_WALLET_INFO,
  LOGOUT,
  AuthActionTypes,
  walletInterface,
  userInterface,
} from '../types/index';

export const authenticate: ActionCreator<AuthActionTypes> = (
  userId: string,
  token: string,
) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token,
  };
};

export const setUserInfo: ActionCreator<AuthActionTypes> = (
  data: userInterface,
) => {
  return {
    type: SET_USER_INFO,
    userInfo: data,
  };
};

export const setUserBalance: ActionCreator<AuthActionTypes> = (
  wallet: walletInterface,
) => {
  return {
    type: SET_USER_BALANCE,
    wallet: wallet,
  };
};

export const setWalletInfo: ActionCreator<AuthActionTypes> = (
  data: walletInterface,
) => {
  return {
    type: SET_WALLET_INFO,
    wallet: data,
  };
};

export const signup = (userId: string, token: string) => {
  return async (dispatch) => {
    saveDataToStorage(token, userId);
    dispatch(authenticate(userId, token));
  };
};

export const login = (userId: string, token: string) => {
  return async (dispatch) => {
    dispatch(authenticate(userId, token));
    saveDataToStorage(token, userId);
  };
};

export const editUserInfo = () => {
  return async (dispatch) => {
    //saveDataToStorage(resData.token, resData.user);
  };
};

export const logout: ActionCreator<AuthActionTypes> = () => {
  AsyncStorage.removeItem('userData');
  return {type: LOGOUT};
};

export const saveDataToStorage = (token: string, userId: string) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
    }),
  );
};
