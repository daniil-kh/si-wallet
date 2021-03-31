export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const EDIT_USER_INFO = 'EDIT_USER_INFO';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_WALLET_INFO = 'SET_WALLET_INFO';
export const SET_USER_BALANCE = 'SET_USER_BALANCE';
export const SET_USER_FULL_NAME = 'SET_USER_FULL_NAME';

export interface userInterface {
  id: string;
  balance: number;
  username: string;
  totalBalance: number;
  tradeBalance: number;
  profitAmount: number;
  profitPercent: string;
  APY: number;
  DDY: number;
  notifications: boolean;
  name: string;
  surname: string;
  email: string;
}

export interface walletInterface {}

export interface authState {
  token: string | null;
  userId: string | null;
  user: userInterface | null;
  wallet: walletInterface | null;
}

interface AuthenticateAction {
  type: typeof AUTHENTICATE;
  userId: string;
  token: string;
}

interface LogoutAction {
  type: typeof LOGOUT;
}
interface EditUserInfoAction {
  type: typeof EDIT_USER_INFO;
  user: userInterface;
}

interface SetUserInfoAction {
  type: typeof SET_USER_INFO;
  userInfo: userInterface;
}
interface SetWalletInfoAction {
  type: typeof SET_WALLET_INFO;
  wallet: walletInterface;
}

interface SetUserBalance {
  type: typeof SET_USER_BALANCE;
  wallet: walletInterface;
}

interface SetUserFullName {
  type: typeof SET_USER_FULL_NAME;
  name: string;
  surname: string;
}

export type AuthActionTypes =
  | AuthenticateAction
  | LogoutAction
  | EditUserInfoAction
  | SetUserInfoAction
  | SetWalletInfoAction
  | SetUserBalance
  | SetUserFullName;
