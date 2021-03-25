import {} from '../actions/auth';

import {
  AUTHENTICATE,
  LOGOUT,
  EDIT_USER_INFO,
  SET_USER_INFO,
  SET_WALLET_INFO,
  SET_USER_FULL_NAME,
  SET_USER_BALANCE,
  authState,
  AuthActionTypes,
} from '../types';

const initialState: authState = {
  token: null,
  userId: null,
  user: null,
  wallet: null,
};

export default (state: authState = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;
    case EDIT_USER_INFO:
      return {
        ...state,
        user: action.user,
      };
    case SET_USER_INFO:
      const {
        name,
        surname,
        balance,
        username,
        email,
        id,
        totalBalance,
        tradeBalance,
        APY,
        DDY,
        notifications,
        profitAmount,
        profitPercent,
      } = action.userInfo;
      return {
        ...state,
        user: {
          id,
          balance,
          username,
          accountInfo: {
            name,
            surname,
            email,
          },
          balanceInfo: {
            totalBalance,
            tradeBalance,
            profitAmount,
            profitPercent,
            APY,
            DDY,
            notifications,
          },
        },
      };
    case SET_WALLET_INFO:
      return {
        ...state,
        wallet: action.wallet,
      };
    case SET_USER_FULL_NAME:
      return {
        ...state,
        user: {...state.user, name: action.name, surname: action.surname},
      };
    case SET_USER_BALANCE:
      return {
        ...state,
        wallet: action.wallet,
      };
    default:
      return state;
  }
};
