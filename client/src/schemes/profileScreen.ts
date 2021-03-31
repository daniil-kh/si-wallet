import Colors from '../constants/Colors';

export interface userPersonalInfo {
  title: string;
  value: string;
}

export interface userBalanceInfo {
  title: string;
  value: string;
  valueStyle?: any;
}

export const getUserPersonalInfo = (user: any): userPersonalInfo[] => {
  return [
    {
      title: 'First name',
      value: user?.accountInfo.name,
    },
    {
      title: 'Last name',
      value: user?.accountInfo.surname,
    },
    {
      title: 'Email',
      value: user?.accountInfo.email,
    },
  ];
};

export const getUserBalanceInfo = (user: any): userBalanceInfo[] => {
  return [
    {
      title: 'Balance',
      value: '$' + user?.balanceInfo.totalBalance,
    },
    {
      title: 'TradeBalance',
      value: '$' + user?.balanceInfo.tradeBalance,
    },
    {
      title: 'TotalProfit',
      value:
        '$' +
        user?.balanceInfo.profitAmount +
        ' / ' +
        user?.balanceInfo.profitPercent +
        '%',
      valueStyle: {color: Colors.greenMain},
    },
    {
      title: 'APY',
      value: user?.balanceInfo.APY + '%',
      valueStyle: {color: Colors.greenMain},
    },
    {
      title: 'DDY',
      value: user?.balanceInfo.DDY + '%',
      valueStyle: {color: Colors.greenMain},
    },
    {
      title: 'Notifications',
      value: user?.balanceInfo.notifications ? 'On' : 'off',
      valueStyle: {
        color: user?.balanceInfo.notifications ? Colors.greenMain : Colors.red,
      },
    },
  ];
};
