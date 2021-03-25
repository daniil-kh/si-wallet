import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import {
  FlingGestureHandler,
  State,
  Directions,
} from 'react-native-gesture-handler';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import data, {detailsList, iconsByType} from '../../../schemes/botRateCards';
import {Transition, Transitioning} from 'react-native-reanimated';
import posed, {Transition as PoseTransition} from 'react-native-pose';

import {CreateBotScreen} from './types/routing';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const DURATION = 700;
const TITLE_SIZE = 36;
const SPACING = 80;
const IMAGE_SIZE = windowWidth * 0.8;

const colors = {
  lightBg: Colors.orangeMain, //'#F2BC94',  Colors.headerBackground
  darkBg: Colors.blackBackground,
  lightText: Colors.orangeMain, //
  darkText: Colors.blackBackground,
};

const Item = ({children, style}) => {
  return <View style={[styles.itemStyle, style]}>{children}</View>;
};

const Icon = ({type}) => {
  return <Image source={{uri: type}} style={styles.iconStyle} />;
};

const Description = ({index, text, color}) => {
  return (
    <Item>
      <Text key={`description-${index}`} style={{fontSize: 16, color: color}}>
        {text}
      </Text>
    </Item>
  );
};

const Title = ({index, text, color}) => {
  return (
    <Item style={styles.titleContainerStyle}>
      <Text
        key={`title-${index}`}
        style={{fontSize: TITLE_SIZE, color: color, fontWeight: '900'}}>
        {text}
      </Text>
    </Item>
  );
};

const Details = ({color, index}) => {
  return (
    <View style={{marginVertical: SPACING}}>
      {detailsList.map((key) => {
        return (
          <View key={key} style={styles.detailsRowStyle}>
            <Icon type={iconsByType[key]} />
            <Item style={{flex: 1, height: 26, justifyContent: 'center'}}>
              <Text
                key={`${key}-${index}`}
                style={[styles.detailsRowTextStyle, {color: color}]}>
                {data[index][key]}
              </Text>
            </Item>
          </View>
        );
      })}
    </View>
  );
};

const transition = (
  <Transition.Together>
    <Transition.Out
      type="slide-bottom"
      durationMs={DURATION}
      interpolation="easeIn"
    />
    <Transition.Change />
    <Transition.In
      type="slide-bottom"
      durationMs={DURATION}
      interpolation="easeOut"
    />
  </Transition.Together>
);

const config = {
  transition: {
    type: 'tween',
    duration: DURATION,
    easing: Easing.elastic(0.9),
  },
};

const PosedView = posed.View({
  enter: {
    opacity: 1,
    rotate: '0deg',
    ...config,
  },
  exit: {
    opacity: 0,
    rotate: '180deg',
    ...config,
  },
});

const CreateBotScreen_2: React.FC<CreateBotScreen> = (props) => {
  const [index, setIndex] = useState(0);
  let color = index % 2 === 1 ? colors.lightText : colors.darkText;
  let headingColor = index % 2 === 1 ? colors.lightText : colors.darkText;
  const activeIndex = useRef(new Animated.Value(0)).current;
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: activeIndex,
      duration: DURATION * 0.7,
      useNativeDriver: true,
    }).start();

    StatusBar.setBarStyle(
      index % 2 === 0 ? 'light-content' : 'dark-content',
      true,
    );
  });

  const setActiveIndex = useCallback((newIndex) => {
    activeIndex.setValue(newIndex);
    ref.current.animateNextTransition();
    setIndex(newIndex);
  });

  const translateY = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [windowHeight, 0, -windowHeight],
  });

  const ref = useRef();

  return (
    <FlingGestureHandler
      key="up"
      direction={Directions.UP}
      onHandlerStateChange={(event) => {
        if (event.nativeEvent.state === State.END) {
          if (index === data.length - 1) {
            return;
          }
          setActiveIndex(index + 1);
        }
      }}>
      <FlingGestureHandler
        key="down"
        direction={Directions.DOWN}
        onHandlerStateChange={(event) => {
          if (event.nativeEvent.state === State.END) {
            if (index === 0) {
              return;
            }
            setActiveIndex(index - 1);
          }
        }}>
        <SafeAreaView style={[styles.container]}>
          <Animated.View
            style={[
              StyleSheet.absoluteFillObject,
              {
                height: windowHeight * data.length,
                transform: [{translateY: translateY}],
              },
            ]}>
            {data.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    height: windowHeight,
                    backgroundColor:
                      index % 2 === 0 ? colors.lightBg : colors.darkBg,
                  }}></View>
              );
            })}
          </Animated.View>
          <PoseTransition>
            {index % 2 === 0 ? (
              <PosedView
                key="image0"
                style={[
                  styles.imageContainer,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.darkBg : colors.lightBg,
                  },
                ]}>
                <Image source={data[index].url} style={styles.image} />
              </PosedView>
            ) : (
              <PosedView
                key="image1"
                style={[
                  styles.imageContainer,
                  {
                    borderColor:
                      index % 2 === 0 ? colors.darkBg : colors.lightBg,
                  },
                ]}>
                <Image source={data[index].url} style={styles.image} />
              </PosedView>
            )}
          </PoseTransition>
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={{padding: 20, flex: 1, justifyContent: 'space-evenly'}}>
            <Title
              color={headingColor}
              index={index}
              text={data[index].title}
            />
            <Details color={color} index={index} />
            <Description
              index={index}
              text={data[index].description}
              color={headingColor}
            />
          </Transitioning.View>
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};

export const screenOptions = (navData: CreateBotScreen) => {
  return {
    headerTitle: 'New Bot',
    headerShown: false,
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
  switch: {
    transform: [{scaleX: 1.8}, {scaleY: 1.6}],
    marginBottom: 10,
    marginRight: 14,
    marginTop: 9,
  },
  flagTitle: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
    paddingBottom: 10,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    paddingVertical: 25,
  },
  flatList: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 17,
  },
  itemStyle: {
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  iconStyle: {
    marginRight: 15,
    height: 26,
    width: 26,
  },
  titleContainerStyle: {
    height: TITLE_SIZE * 3,
    justifyContent: 'flex-end',
  },
  detailsRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  detailsRowTextStyle: {
    fontSize: 16,
    fontWeight: '700',
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    // backgroundColor: '#f00',
    position: 'absolute',
    top: windowHeight * 0.3,
    borderWidth: 12,
    borderRadius: IMAGE_SIZE / 2,
    right: -120,
    zIndex: 1,
    overflow: 'hidden',
  },
  image: {
    width: IMAGE_SIZE / 1.2,
    height: IMAGE_SIZE / 1.08,
    right: 5,
  },
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
});

export default CreateBotScreen_2;
