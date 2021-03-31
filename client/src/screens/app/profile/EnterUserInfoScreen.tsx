import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import DefaultTextInput from '../../../components/profileScreen/DefaultTextInput';
import ButtonComponent from '../../../components/ButtonComponent';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import * as UserAPI from '../../../API/UserAPI';
import {useSelector, useDispatch} from 'react-redux';
import * as authActions from '../../../store/actions/auth';
import {SaveButtonContainerProps} from './types/enterUserInfoScreen';

import {EditUserInfoScreenProps} from './types/routing';

const SaveButtonContainer: React.FC<SaveButtonContainerProps> = (props) => {
  if (props.isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={Colors.greenMain} />
      </View>
    );
  } else {
    return (
      <ButtonComponent
        title={'Save'}
        onPress={props.onPress}
        buttonContainerStyle={{padding: 0}}
      />
    );
  }
};

const EnterUserInfoScreen: React.FC<EditUserInfoScreenProps> = (props) => {
  const {name: propsName, surname: propsSurname} = props.route.params;
  const {token} = useSelector((state) => state.auth);

  const [name, setName] = useState<string>(propsName);
  const [surname, setSurname] = useState<string>(propsSurname);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | undefined>();

  const dispatch = useDispatch();

  const editUserInfo = async (token: string, name: string, surname: string) => {
    setLoadingError(undefined);
    setIsLoading(true);
    try {
      const result = await UserAPI.editUserInfo(token, name, surname);
      if (result.statusCode === 200) {
        dispatch(authActions.setUserInfo(result.data));
        props.navigation.goBack();
      } else {
        Global.errorHandler(result);
      }
    } catch (err) {
      Alert.alert('Manage profile', "Can't edit user info", [{text: 'OK'}]);
      setLoadingError(err.message);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.screenWrapper}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <View style={styles.inputFieldsContainer}>
          <DefaultTextInput
            containerTitle={'Name'}
            onChangeText={(text: string) => {
              setName(text);
            }}
            value={name}
            placeholderTextColor={Colors.placeholder}
            placeholder="Enter name"
            autoCapitalize={'none'}
            inputStyle={{margingBottom: 10}}
          />
          <DefaultTextInput
            containerTitle={'Surname'}
            onChangeText={(text: string) => {
              setSurname(text);
            }}
            value={surname}
            placeholder="Enter surname"
            placeholderTextColor={Colors.placeholder}
            autoCapitalize={'none'}
          />
          <SaveButtonContainer
            onPress={() => {
              editUserInfo(token, name, surname);
            }}
            isLoading={isLoading}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export const screenOptions = (navData: EditUserInfoScreenProps) => {
  return {
    headerTitle: 'Manage Profile',
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
  screenWrapper: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
  },
  inputFieldsContainer: {
    flex: 1,
    marginTop: 25,
    paddingHorizontal: 17,
  },
  activityIndicator: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EnterUserInfoScreen;
