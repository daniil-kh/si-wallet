import React, {useRef} from 'react';
import {StyleSheet, View, FlatList, Animated} from 'react-native';
import Colors from '../constants/Colors';
import * as Global from '../Global';
import NewsCard from './discoveryScreen/NewsCard';
import {useNavigation} from '@react-navigation/native';

const AVATAR_SIZE = 118;
const MARGIN_BOTTOM = 16;
const HEADER_HEIGHT = 300;
const ITEM_SIZE = AVATAR_SIZE + MARGIN_BOTTOM;

const ContentList = (props) => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  console.log('props.news', props.data);

  const renderNewsCard = ({item, index}) => {
    const inputRange = [
      -1,
      0,
      HEADER_HEIGHT + ITEM_SIZE * index,
      HEADER_HEIGHT + ITEM_SIZE * (index + 2),
    ];
    const opacityInputRange = [
      -1,
      0,
      HEADER_HEIGHT + ITEM_SIZE * index,
      HEADER_HEIGHT + ITEM_SIZE * (index + 0.8),
    ];
    const scale = scrollY.interpolate({
      inputRange: inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <NewsCard
        news={item}
        onCardPress={() => {
          navigation.navigate('DiscoveryNavigator', {
            screen: 'NewsInfo',
            params: {
              newsItem: item,
              title: item.title,
            },
          });
        }}
        scale={scale}
        opacity={opacity}
      />
    );
  };

  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
        useNativeDriver: true,
      })}
      style={props.listStyle}
      data={props.data}
      keyExtractor={(item) => item._id}
      renderItem={renderNewsCard}
      ListHeaderComponent={props.header}
    />
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: Colors.listHeaderTitle,
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
  },
});

export default ContentList;
