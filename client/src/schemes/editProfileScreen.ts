import Colors from '../constants/Colors';

export interface userAdditionalInfo {
  title: string;
  value: boolean;
  valueStyle?: any;
}

export const getUserAdditionalInfo = (
  isNorificationsOn: boolean = false,
  autoRenevalStatus: boolean = false,
  isBotsActive: boolean = false,
): userAdditionalInfo[] => {
  return [
    {
      title: 'Notifications',
      value: isNorificationsOn,
    },
    {
      title: 'Auto-reneval',
      value: autoRenevalStatus,
    },
    {
      title: 'Bots-status',
      value: isBotsActive,
      valueStyle: {color: Colors.greenMain},
    },
  ];
};
