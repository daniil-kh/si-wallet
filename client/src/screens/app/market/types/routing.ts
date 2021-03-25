import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type MarketParamList = {
  CoinsInfo: {
    coin: string;
    title: string;
  };
  Market: undefined;
  MarketNavigator: {
    screen: string;
    params: {
      coin: any;
      title: string;
    };
  };
};

export type MarketNavigationProps<T extends keyof MarketParamList> = {
  navigation: StackNavigationProp<MarketParamList, T>;
  route: RouteProp<MarketParamList, T>;
};

export type CoinInfoScreenProps = MarketNavigationProps<'CoinsInfo'>;
export type MarketScreenProps = MarketNavigationProps<'Market'>;
export type MarketNavigatorProps = MarketNavigationProps<'MarketNavigator'>;
