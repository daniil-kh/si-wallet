import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type BotsParamList = {
  BotInfo: undefined;
  Bots: undefined;
  CreateBotScreen: undefined;
  BotsNavigator: {
    screen: string;
    params: any;
  };
};

export type BotsNavigationProps<T extends keyof BotsParamList> = {
  navigation: StackNavigationProp<BotsParamList, T>;
  route: RouteProp<BotsParamList, T>;
};

export type BotInfoScreenProps = BotsNavigationProps<'BotInfo'>;
export type BotsScreenProps = BotsNavigationProps<'Bots'>;
export type CreateBotScreenProps = BotsNavigationProps<'CreateBotScreen'>;
