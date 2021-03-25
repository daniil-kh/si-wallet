import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import DefaultTextInput from '../../../components/profileScreen/DefaultTextInput';
import ButtonComponent from '../../../components/ButtonComponent';
import BOT_RATE_CARDS from '../../../schemes/botRateCards';
import BotRateCard from '../../../components/botsScreen/BotRateCard';

const CreateBotScreen = (props) => {
  const [name, setName] = useState();
  const [balance, setBalance] = useState();
  const [description, setDescription] = useState();
  const [renevalSwitch, setRenevalSwitch] = useState(false);
  const [notificationsSwitch, setNotificationsSwitch] = useState(false);
  const [activeRate, setActiveRate] = useState('MiniBot');

  const toggleRenevalSwitch = (value) => {
    setRenevalSwitch(value);
  };

  const toggleNotificationsSwitch = (value) => {
    setNotificationsSwitch(value);
  };

  const renderItem = ({item, index}) => {
    return (
      <BotRateCard
        item={item}
        activeRate={activeRate}
        setActiveRate={setActiveRate}
        cardMargin={index === BOT_RATE_CARDS.length - 1 ? 34 : 15}
      />
    );
  };

  console.log('SS');
  return (
    <ScrollView style={styles.screen}>
      <DefaultTextInput
        onChangeText={(text) => {
          setName(text);
        }}
        value={name}
        placeholder="NAME"
        placeholderTextColor={Colors.placeholder}
        autoCapitalize={'none'}
        inputStyle={{paddingHorizontal: 17}}
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.flatList}
        data={BOT_RATE_CARDS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <DefaultTextInput
        onChangeText={(text) => {
          setBalance(text);
        }}
        value={balance}
        placeholder="BALANCE"
        placeholderTextColor={Colors.placeholder}
        autoCapitalize={'none'}
        keyboardType="numeric"
        inputStyle={{paddingHorizontal: 17}}
      />
      <DefaultTextInput
        onChangeText={(text) => {
          setDescription(text);
        }}
        value={description}
        placeholder="DESCRIPTION"
        placeholderTextColor={Colors.placeholder}
        autoCapitalize={'none'}
        inputStyle={{paddingHorizontal: 17}}
      />
      <View style={{flexDirection: 'row', paddingHorizontal: 17}}>
        <Text style={styles.flagTitle}>Auto-renewal</Text>
        <View style={{flex: 1}}></View>

        <View style={{alignItems: 'flex-end'}}>
          <Switch
            trackColor={{
              false: Colors.switchInActiveColor,
              true: Colors.greenMain,
            }}
            thumbColor={renevalSwitch ? Colors.white : Colors.white}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleRenevalSwitch}
            value={renevalSwitch}
            style={styles.switch}
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', paddingHorizontal: 17}}>
        <Text style={styles.flagTitle}>Notifications</Text>
        <View style={{flex: 1}}></View>

        <Switch
          trackColor={{
            false: Colors.switchInActiveColor,
            true: Colors.greenMain,
          }}
          thumbColor={renevalSwitch ? Colors.white : Colors.white}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotificationsSwitch}
          value={notificationsSwitch}
          style={styles.switch}
        />
      </View>
      <ButtonComponent
        title="Create Bot"
        buttonContainerStyle={{
          paddingHorizontal: 17,
          marginBottom: 40,
          marginTop: 10,
        }}
      />
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'New Bot',
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

export default CreateBotScreen;
