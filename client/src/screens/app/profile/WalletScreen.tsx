import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import BalanceInfoCard from '../../../components/profileScreen/BalanceInfoCard';
import CurrencyListWallet from '../../../components/profileScreen/CurrencyListWallet';
import * as WalletAPI from '../../../API/WalletAPI';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../../../store/actions/auth';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorScreen from '../../../components/ErrorScreen';
import CurrencyCard from '../../../components/profileScreen/CurrencyCard';

import {WalletScreenProps} from './types/routing';

const WalletScreen: React.FC<WalletScreenProps> = (props) => {
  let {token, userId, wallet} = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | undefined>();

  const dispatch = useDispatch();

  const loadWalletInfo = useCallback(
    async (token: string) => {
      setIsLoading(true);
      setLoadingError(undefined);

      try {
        const result = await WalletAPI.getWalletInfo(token);
        if (result.statusCode === 200) {
          dispatch(authActions.setWalletInfo(result.data));
        } else {
          Global.errorHandler(result);
        }
      } catch (err) {
        setLoadingError(err.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    [userId, token],
  );

  useEffect(() => {
    loadWalletInfo(token);
  }, [userId, token]);

  const renderCurrencyCard = ({item, index}: {item: any; index: number}) => {
    return (
      <CurrencyCard
        currency={item}
        isActive={false}
        isLast={index === wallet.length - 1 ? true : false}
      />
    );
  };

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading wallet info, try again"
        onErrorPress={() => {
          loadWalletInfo(token);
        }}
      />
    );
  } else if (isLoading || !wallet) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.screen}>
        <BalanceInfoCard
          dayChangePercent="+0"
          dayChange="0"
          balance={wallet[0]?.totalBalance}
          cardStyle={{marginTop: 20, marginBottom: 24}}
          onSendPress={() => {
            props.navigation.navigate('Coins', {
              wallet: wallet,
              type: 'send',
            });
          }}
          onReceivePress={() => {
            props.navigation.navigate('Coins', {
              wallet: wallet,
              type: 'receive',
            });
          }}
          isButtonsActive={true}
          firstTitle="PORTFOLIO VALUE"
          secondTitle="24H CHANGE"
        />
        <CurrencyListWallet
          currencies={wallet}
          renderCurrencyItem={renderCurrencyCard}
        />
      </View>
    );
  }
};

export const screenOptions = (navData: WalletScreenProps) => {
  return {
    headerTitle: 'Wallet',
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => {
          navData.navigation.goBack();
        }}>
        <Image
          source={require('../../../assets/images/backIcon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 28,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  backIcon: {
    height: 24,
    width: 24,
    marginLeft: 14,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
  },
});

export default WalletScreen;
