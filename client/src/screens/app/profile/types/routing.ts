import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type ProfileParamList = {
  Profile: undefined;
  Coins: {
    type: string;
    wallet: any;
  };
  EditProfile: {
    notifications: boolean;
  };
  Wallet: undefined;
  Transaction: {
    type: string;
    currency: string;
  };
  EditUserInfo: {
    name: string;
    surname: string;
  };
  ProfileNavigator:
    | {
        screen: string;
        params: {
          notifications: boolean;
        };
      }
    | {screen: string};
  Transactions: {
    currency: any;
    type: string;
  };
  EnterUserInfo: {
    name: string;
    surname: string;
  };
};

export type ProfileNavigationProps<T extends keyof ProfileParamList> = {
  navigation: StackNavigationProp<ProfileParamList, T>;
  route: RouteProp<ProfileParamList, T>;
};

export type ProfileScreenProps = ProfileNavigationProps<'Profile'>;
export type CoinsScreenProps = ProfileNavigationProps<'Coins'>;
export type EditProfileScreenProps = ProfileNavigationProps<'EditProfile'>;
export type WalletScreenProps = ProfileNavigationProps<'Wallet'>;
export type TransactionScreenProps = ProfileNavigationProps<'Transaction'>;
export type EditUserInfoScreenProps = ProfileNavigationProps<'EditUserInfo'>;
export type ProfileNavigatorScreenProps = ProfileNavigationProps<'ProfileNavigator'>;
