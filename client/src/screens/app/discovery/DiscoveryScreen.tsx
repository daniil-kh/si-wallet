import React, {useState, useEffect, useCallback} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorScreen from '../../../components/ErrorScreen';
import ContentList from '../../../components/ContentList';
import {useDispatch, useSelector} from 'react-redux';
import * as NewsAPI from '../../../API/NewsAPI';
import newsData from '../../../schemes/dummy-news-data';

import {DiscoveryScreenProps} from './types/routing';

const DiscoveryScreen: React.FC<DiscoveryScreenProps> = (props) => {
  const {userId, token} = useSelector((state) => state.auth);
  let CardsContent: any = View;

  const [news, setNews] = useState([]);
  const [contentCards, setContentCards] = useState();
  const [newsLoading, setNewsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | undefined>(
    undefined,
  );

  const dispatch = useDispatch();

  const getNews = useCallback(
    async (token: string) => {
      setNewsLoading(true);
      setLoadingError(undefined);
      try {
        let result = await NewsAPI.getNews(token, 0);
        if (result.statusCode === 200) {
          setNews(result.data);
          setContentCards(result.data);
        } else {
          Global.errorHandler(result);
        }
      } catch (err) {
        setLoadingError(err.message);
      }
      setNewsLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    //getNews(token);
    //console.log(newsData)
    setNews(newsData);
    setContentCards(newsData);
    console.log('LATEST');
    //console.log(contentCards.latest);
  }, []);

  // if (!userId && !token) {
  //   CardsContent = ErrorScreen;
  // } else {
  //
  //   if (loadingError) {
  //     CardsContent = ErrorScreen;
  //   } else if (newsLoading) {
  //     CardsContent = LoadingScreen;
  //   }
  // }
  CardsContent = ContentList;

  const renderEventItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View>
        <TouchableOpacity
          event={item}
          onPress={() => {
            props.navigation.navigate('DiscoveryNavigator', {
              screen: 'NewsInfo',
              params: {
                newsItem: item,
                title: item.title,
              },
            });
          }}
          style={styles.eventWrapper}>
          <Image
            source={{uri: item.originalImageUrl}}
            style={styles.eventImage}
          />
        </TouchableOpacity>
        <Text style={styles.eventTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    );
  };

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading news, try again"
        onErrorPress={() => {
          getNews(token);
        }}
      />
    );
  } else if (newsLoading || !contentCards) {
    return <LoadingScreen />;
  } else {
    return (
      <View style={{flex: 1, backgroundColor: Colors.blackBackground}}>
        <CardsContent
          data={newsData.latest}
          listStyle={styles.flatList}
          isAction={true}
          errorText={'An error occured while getting news, try again'}
          onErrorPress={() => {
            //getNews(token);
            setNews(newsData);
            setContentCards(newsData);
          }}
          // header={() => (
          //   <View>
          //     <Text style={styles.listHeader}>Top Events</Text>
          //     <FlatList
          //       showsHorizontalScrollIndicator={false}
          //       style={styles.listStyle}
          //       data={contentCards?.top}
          //       keyExtractor={(item) => item._id}
          //       renderItem={renderEventItem}
          //       horizontal={true}
          //     />
          //     <Text style={{...styles.listHeader}}>News</Text>
          //   </View>
          // )}
        />
      </View>
    );
  }
};

export const screenOptions = {
  headerTitle: 'Discovery',
};

const styles = StyleSheet.create({
  listHeader: {
    color: Colors.listHeaderTitle,
    fontSize: 25,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 19,
  },
  eventTitle: {
    color: Colors.adressGray,
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    width: 270,
    marginLeft: 5,
  },
  listStyle: {
    paddingHorizontal: 19,
  },
  eventImage: {
    width: 300,
    height: 175,
    borderRadius: 12,
  },
  eventWrapper: {
    borderRadius: 12,
    marginRight: 16,
    marginBottom: 10,
  },
});

export default DiscoveryScreen;
