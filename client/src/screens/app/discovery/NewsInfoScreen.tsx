import React, {useCallback} from 'react';
import {
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';

import {NewsInfoScreenProps} from './types/routing';

const NewsInfoScreen: React.FC<NewsInfoScreenProps> = (props) => {
  const newsItem = props.route.params.newsItem;

  const OpenURLButton = ({url, children}: {url: string; children: any}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.titleText}>{newsItem.title}</Text>
      <Text style={styles.dateText}>
        {new Date(newsItem.time * 1000).toDateString()}
      </Text>
      <Image
        source={{uri: newsItem.image}}
        style={styles.previewImage}
      />
      <Text style={styles.descriptionText}>{newsItem.description}</Text>
      <OpenURLButton url={newsItem.url}>Read more...</OpenURLButton>
    </ScrollView>
  );
};

export const screenOptions = (navData: NewsInfoScreenProps) => {
  return {
    headerTitle: 'Discovery',
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
  previewImage: {
    height: 175,
    borderRadius: 12,
    marginBottom: 16,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    paddingHorizontal: 17,
    paddingVertical: 12,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.descriptionText,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 22,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
  },
  button: {
    height: 57,
    flex: 1,
    borderRadius: 12,
    backgroundColor: Colors.greenMain,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 13,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: '#B2B5BA',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
    marginRight: 20,
    marginBottom: 6,
  },
  backIcon: {
    height: 24,
    width: 24,
    marginLeft: 14,
  },
});

export default NewsInfoScreen;
