import {iconsList, Bot} from '../types/globalTypes';

export const detailsList: string[] = ['rentPrice', 'rentTime', 'range', 'APY'];

export const iconsByType: iconsList = {
  rentPrice: 'https://static.thenounproject.com/png/426792-200.png',
  rentTime:
    'https://icons.veryicon.com/png/System/iOS%207/Time%20And%20Date%20Timer.png',
  range:
    'https://cdn.iconscout.com/icon/premium/png-256-thumb/digital-wallet-1532941-1299327.png',
  APY: 'https://image.flaticon.com/icons/png/512/103/103093.png',
};

const Bots: Bot[] = [
  {
    title: 'Silver',
    rentPrice: 'Free',
    rentTime: '30 days',
    tradingBalanceDown: 15,
    tradingBalanceUp: 250,
    range: 15 + '-' + 250 + '$',
    APY: '6%',
    id: 'MiniBotID',
    url: require('../assets/images/8.jpg'), //9
  },
  {
    title: 'Gold',
    rentPrice: '10$',
    rentTime: '60 days',
    tradingBalanceDown: 45,
    tradingBalanceUp: 700,
    range: 45 + '-' + 700 + '$',
    APY: '9%',
    id: 'StandartBotID',
    url: require('../assets/images/8.jpg'),
  },
  {
    title: 'Platinum',
    rentPrice: '25$',
    rentTime: '90 days',
    tradingBalanceDown: 100,
    tradingBalanceUp: 2500,
    range: 100 + '-' + 2500 + '$',
    APY: '12%',
    id: 'ProBotID',
    url: require('../assets/images/8.jpg'), //10
  },
  {
    title: 'Black',
    rentPrice: '100$',
    rentTime: '90 days',
    tradingBalanceDown: 1000,
    tradingBalanceUp: 10000,
    range: 1000 + '-' + 10000 + '$',
    APY: '24%',
    id: 'NetPremiumID',
    url: require('../assets/images/8.jpg'), //4
  },
];

export default Bots;
