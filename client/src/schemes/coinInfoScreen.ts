import Colors from '../constants/Colors';

export interface coinInfo {
  title: string;
  value: number;
  valueStyle?: any;
}

export const getCoinInfo = (currency: any): coinInfo[] => {
  console.log(currency?.all_time_high.at)
  return [
    {
      title: 'All time high',
      value: '$' + currency?.all_time_high.price?.toFixed(2),
    },
    {
      title: 'All time high date',
      value: (new Date(currency?.all_time_high.at)).toDateString(),
    },
    {
      title: 'Volume',
      value: '$' + currency?.market_data.volume_last_24_hours?.toFixed(2),
    },
    {
      title: 'Symbol',
      value: currency?.symbol,
    },
    {
      title: 'Name',
      value: currency?.name,
    },
    {
      title: 'Day high',
      value: currency?.market_data.ohlcv_last_24_hour.high?.toFixed(2),
    },
  ];
};
