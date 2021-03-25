import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';

const NewsCard = (props) => {
  return (
    <Animated.View
      style={{transform: [{scale: props.scale}], opacity: props.opacity}}>
      <TouchableOpacity
        style={styles.newsContainer}
        onPress={props.onCardPress}>
        <View style={{flex: 1}}>
          <Text style={styles.titleText} numberOfLines={3}>
            {props.news.title}
          </Text>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Text style={styles.dateText}>
              {new Date(props.news.publishedAt).toDateString()}
            </Text>
          </View>
        </View>
        <Image
          source={{uri: props.news.originalImageUrl}}
          style={styles.newsImage}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    marginBottom: 16,
  },
  newsContainer: {
    borderRadius: 8,
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 19,
  },
  titleText: {
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.newsTitle,
    fontSize: 18,
    marginLeft: 3,
    marginRight: 20,
  },
  dateText: {
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.adressGray,
    fontSize: 13,
    marginLeft: 7,
    marginBottom: 6,
  },
  newsImage: {
    width: 118,
    height: 118,
    borderRadius: 8,
  },
});

export default NewsCard;
