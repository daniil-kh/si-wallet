import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type DiscoveryParamList = {
  Discovery: undefined;
  NewsInfo: {
    newsItem: any;
  };
  DiscoveryNavigator: {
    screen: string;
    params: {
      newsItem: any;
      title: string;
    };
  };
};

export type DiscoveryNavigationProps<T extends keyof DiscoveryParamList> = {
  navigation: StackNavigationProp<DiscoveryParamList, T>;
  route: RouteProp<DiscoveryParamList, T>;
};

export type DiscoveryScreenProps = DiscoveryNavigationProps<'Discovery'>;
export type NewsInfoScreenProps = DiscoveryNavigationProps<'NewsInfo'>;
export type DiscoveryNavigatorProps = DiscoveryNavigationProps<'DiscoveryNavigator'>;
