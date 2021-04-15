import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import LoadingScreen from '../../../components/LoadingScreen';
import ContentList from '../../../components/ContentList';
import ErrorScreen from '../../../components/ErrorScreen';
import {useDispatch, useSelector} from 'react-redux';
import * as WalletAPI from '../../../API/WalletAPI';
import CoinCard from '../../../components/marketScreen/CoinCard';
import CurrencyList from '../../../components/profileScreen/CurrencyList';
import CurrencyPairCard from '../../../components/marketScreen/CurrencyPairCard';

import {MarketScreenProps} from './types/routing';

const MarketScreen: React.FC<MarketScreenProps> = (props) => {
  const {userId, token} = useSelector((state) => state.auth);
  let CardsContent: any = View;

  const [coins, setCoins] = useState([]);
  const [contentCards, setContentCards] = useState();
  const [coinsLoading, setCoinsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | undefined>(
    undefined,
  );

  const dispatch = useDispatch();

  const getCoins = useCallback(
    async (token: string) => {
      setCoinsLoading(true);
      setLoadingError(undefined);
      try {
        let result = await WalletAPI.getCoins(token);
        if (result.statusCode === 200) {
          setCoins(result.data);
          setContentCards(result.data);
        } else {
          Global.errorHandler(result);
        }
      } catch (err) {
        setLoadingError(err.message);
      }
      setCoinsLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    getCoins(token);
  }, []);

  if (!userId && !token) {
    CardsContent = ErrorScreen;
  } else {
    CardsContent = ContentList;
    if (loadingError) {
      CardsContent = ErrorScreen;
    } else if (coinsLoading) {
      CardsContent = LoadingScreen;
    }
  }

  const generateRandomData = () => {
    return [
      {x: 1617926400000, y: Math.random() * 200 + 100},
      {x: 1618012800000, y: Math.random() * 200 + 100},
      {x: 1618099200000, y: Math.random() * 200 + 100},
      {x: 1618185600000, y: Math.random() * 200 + 100},
      {x: 1618272000000, y: Math.random() * 200 + 100},
      {x: 1618358400000, y: Math.random() * 200 + 100},
      {x: 1618444800000, y: Math.random() * 200 + 100},
      {x: 1618515418000, y: Math.random() * 200 + 100},
    ];
  };

  const renderCoinCard = ({item, index}: {item: any; index: number}) => {
    const data = generateRandomData();
    return (
      <CoinCard
        currency={item}
        data={data}
        isActive={true}
        isLast={index === contentCards.length - 1 ? true : false}
        onCurrencyPress={() => {
          props.navigation.navigate('MarketNavigator', {
            screen: 'CoinInfo',
            params: {
              coin: item,
              title: item.symbol,
              data: data,
            },
          });
        }}
      />
    );
  };

  const renderPairCard = ({item, index}: {item: any; index: number}) => {
    return <CurrencyPairCard item={item} />;
  };

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading coins, try again"
        onErrorPress={() => {
          getCoins(token);
        }}
      />
    );
  } else if (coinsLoading || !contentCards) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={styles.screen}>
        <CurrencyList
          currencies={contentCards?.assets?.data}
          renderCurrencyItem={renderCoinCard}
          isMarket={true}
          header={() => (
            <View>
              <FlatList
                showsHorizontalScrollIndicator={false}
                style={styles.listStyle}
                data={contentCards?.pairs}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderPairCard}
                horizontal={true}
              />
            </View>
          )}
        />
      </View>
    );
  }
};

export const screenOptions = {
  headerTitle: 'Market',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    paddingTop: 20,
  },
  listStyle: {
    paddingHorizontal: 12,
  },
});

export default MarketScreen;
