import React, {useState, useEffect, useReducer} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';
import {useDispatch} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as AuthAPI from '../../API/AuthAPI';
import KeyboardAvoidingComponent from '../../components/KeyboardAvoidingComponent';
import AnimatedTextInput from '../../components/profileScreen/AnimatedTextInput';
import ButtonComponent from '../../components/ButtonComponent';
import {Header} from './LoginScreen';
import {
  screenState,
  useTextInputType,
  stringAction,
  CheckBoxProps,
  ButtonContainerType,
  booleanAction,
  UserInfoInputContainerProps,
} from './types/signUpScreen';

import {SignUpScreenProps} from './types/routing';

const ERROR_STATUS_CHANGE = 'ERROR_STATUS_CHANGE';
const LOADING_STATUS_CHANGE = 'LOADING_STATUS_CHANGE';
const USER_INFO_CHANGE = 'USER_INFO_CHANGE';

const initialScreenState: screenState = {
  userInfo: {
    login: '',
    password: '',
    repeatedPassword: '',
    email: '',
    name: '',
    surname: '',
    isServiceTermsAccepted: false,
  },
  isLoading: false,
  error: undefined,
};

function useTextInput(
  initialValue: string,
  label: string,
  setValue: (type: string, inputId: string, value: string) => void,
  inputId: string,
  inputStyle: any,
): useTextInputType {
  const [text, setText] = useState<string>(initialValue);

  return {
    value: text,
    onChangeText: (text: string) => {
      setValue(USER_INFO_CHANGE, inputId, text);
      setText(text);
    },
    label,
    inputStyle,
  };
}

const UserInfoInputContainer: React.FC<UserInfoInputContainerProps> = (
  props,
) => {
  const {
    login,
    password,
    repeatedPassword,
    email,
    name,
    surname,
  } = props.userInfo;

  const {screenStateHandler} = props;

  const nameInput = useTextInput(name, 'Name', screenStateHandler, 'name', {
    zIndex: 3,
  });

  const surnameInput = useTextInput(
    surname,
    'Surname',
    screenStateHandler,
    'surname',
    {zIndex: 2},
  );

  const emailInput = useTextInput(email, 'Email', screenStateHandler, 'email', {
    zIndex: 1,
  });

  const loginInput = useTextInput(
    login,
    'Username',
    screenStateHandler,
    'login',
    {zIndex: 0},
  );

  const passwordInput = useTextInput(
    password,
    'Password',
    screenStateHandler,
    'password',
    {zIndex: -1},
  );

  const repeatedPassInput = useTextInput(
    repeatedPassword,
    'Confirm password',
    screenStateHandler,
    'repeatedPassword',
    {zIndex: -2},
  );

  return (
    <View>
      <AnimatedTextInput {...nameInput} />
      <AnimatedTextInput {...surnameInput} />
      <AnimatedTextInput {...emailInput} />
      <AnimatedTextInput {...loginInput} />
      <AnimatedTextInput {...passwordInput} secureTextEntry />
      <AnimatedTextInput {...repeatedPassInput} secureTextEntry />
    </View>
  );
};

export const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => {
          props.setCheckActive(
            USER_INFO_CHANGE,
            'isServiceTermsAccepted',
            !props.enabled,
          );
        }}>
        {props.enabled && (
          <Image
            source={require('../../assets/images/blueCheckIcon.png')}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.rememberMeText}>{props.text}</Text>
    </View>
  );
};

const TermOfServiceText: React.FC = (props) => {
  return (
    <>
      <Text style={styles.rememberMeText}>I have read and agree</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.forgotText}> Terms of Service</Text>
      </TouchableOpacity>
    </>
  );
};

const ButtonContainer: React.FC<ButtonContainerType> = (props) => {
  return (
    <>
      {props.isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={Colors.greenMain} />
        </View>
      ) : (
        <ButtonComponent
          title={'SIGN UP'}
          onPress={props.onPress}
          buttonContainerStyle={{padding: 0}}
        />
      )}
    </>
  );
};

function screenStateReducer(
  state: screenState,
  action: booleanAction,
): screenState;
function screenStateReducer(
  state: screenState,
  action: stringAction,
): screenState;
function screenStateReducer(state = initialScreenState, action: any): any {
  switch (action.type) {
    case USER_INFO_CHANGE:
      const updatedUserInfo = {
        ...state.userInfo,
        [action.inputId]: action.value,
      };
      return {
        ...state,
        userInfo: updatedUserInfo,
      };
    case LOADING_STATUS_CHANGE:
      return {
        ...state,
        isLoading: action.value,
      };
    case ERROR_STATUS_CHANGE:
      return {
        ...state,
        error: action.value,
      };
    default:
      return state;
  }
}

const SignUpScreen: React.FC<SignUpScreenProps> = (props) => {
  const [screenState, dispatchScreenState] = useReducer(
    screenStateReducer,
    initialScreenState,
  );

  const {
    email,
    password,
    repeatedPassword,
    login,
    name,
    surname,
    isServiceTermsAccepted,
  } = screenState.userInfo;

  const {error: registrationError, isLoading} = screenState;

  const dispatch = useDispatch();

  const screenStateHandler = (
    type: any,
    inputIdentifier: any,
    text: any,
  ): void => {
    dispatchScreenState({
      type: type,
      value: text,
      inputId: inputIdentifier,
    });
  };

  const signUpHandler = async (
    email: string,
    password: string,
    repeatedPassword: string,
    login: string,
    name: string,
    surname: string,
  ) => {
    if (password === repeatedPassword) {
      screenStateHandler(ERROR_STATUS_CHANGE, 'error', undefined);
      screenStateHandler(LOADING_STATUS_CHANGE, 'isLoading', true);
      try {
        Keyboard.dismiss();
        let result = await AuthAPI.signup(
          email,
          password,
          login,
          name,
          surname,
        );
        if (result.statusCode === 200) {
          await dispatch(
            authActions.signup(result.data.id, result.data.access_token),
          );
          Global.resetNavigationStack(props.navigation, 'TabNavigator');
        } else {
          Global.errorHandler(result);
        }
      } catch (err) {
        screenStateHandler(ERROR_STATUS_CHANGE, 'error', err.message);
      }
      screenStateHandler(LOADING_STATUS_CHANGE, 'isLoading', false);
    } else {
      Alert.alert('Error occured', 'Passwords do not match', [{text: 'OK'}]);
    }
  };

  useEffect(() => {
    if (registrationError) {
      Alert.alert('Error occured', registrationError, [{text: 'OK'}]);
    }
  }, [registrationError]);

  return (
    <KeyboardAvoidingComponent>
      <ScrollView>
        <Header />
        <View style={{paddingHorizontal: 17, marginBottom: 20}}>
          <UserInfoInputContainer
            screenStateHandler={screenStateHandler}
            userInfo={screenState.userInfo}
          />
          <View style={styles.checkBoxInfoContainer}>
            <CheckBox
              enabled={isServiceTermsAccepted}
              setCheckActive={screenStateHandler}
              text=""
            />
            <TermOfServiceText />
          </View>
          <ButtonContainer
            onPress={() => {
              signUpHandler(
                email,
                password,
                repeatedPassword,
                login,
                name,
                surname,
              );
            }}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingComponent>
  );
};

export const screenOptions = {
  headerTitle: '',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
  },
  walletIcon: {
    width: 87,
    height: 81,
    marginBottom: 11,
    marginLeft: 6,
  },
  titleText: {
    fontSize: 24,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 11,
  },
  checkIcon: {
    width: 12,
    height: 8,
  },
  checkBox: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.outlineStroke,
    backgroundColor: Colors.blackBackground,
    height: 26,
    width: 26,
    marginRight: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxInfoContainer: {
    flexDirection: 'row',
    marginTop: 17,
    paddingHorizontal: 2,
    marginBottom: 27,
  },
  forgotText: {
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.blue,
  },
  rememberMeText: {
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.grayBlueText,
  },
  activityIndicator: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUpScreen;
