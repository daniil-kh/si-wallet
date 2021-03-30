import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../constants/Colors';
import * as Global from '../../Global';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../../store/actions/auth';
import * as AuthAPI from '../../API/AuthAPI';
import KeyboardAvoidingComponent from '../../components/KeyboardAvoidingComponent';
import AnimatedTextInput from '../../components/profileScreen/AnimatedTextInput';
import ButtonComponent from '../../components/ButtonComponent';
import {
  InputFieldsProps,
  CheckBoxProps,
  ButtonsContainerProps,
  TouchableImageProps,
} from './types/loginScreen';
import {serverResponse} from '../../types/globalTypes';
import {LoginScreenProps} from './types/routing';

export const Header: React.FC = (props) => {
  return (
    <View style={styles.headerContainer}>
      <Logo />
      <Text style={styles.titleText}>SIWallet</Text>
    </View>
  );
};

export const Logo: React.FC = (props) => {
  return (
    <Image
      source={require('../../assets/images/SIWalletIcon.png')}
      style={styles.walletIcon}
    />
  );
};

const InputFields: React.FC<InputFieldsProps> = (props) => {
  return (
    <>
      <AnimatedTextInput
        onChangeText={(text: string) => {
          props.setLogin(text);
        }}
        value={props.login}
        label="Username"
        inputStyle={{zIndex: 4}}
      />
      <AnimatedTextInput
        onChangeText={(text: string) => {
          props.setPassword(text);
        }}
        value={props.password}
        label="Password"
        secureTextEntry={true}
      />
    </>
  );
};

const CheckBox: React.FC<CheckBoxProps> = (props) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        style={styles.checkBox}
        onPress={() => {
          props.setCheckActive(!props.enabled);
        }}>
        {props.enabled && (
          <Image
            source={require('../../assets/images/blueCheckIcon.png')}
            style={styles.checkIcon}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.rememberMeText}>Remember me</Text>
    </View>
  );
};

const ResetPasswordComponent: React.FC = (props) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Text style={styles.forgotText}>Forgot password?</Text>
    </TouchableOpacity>
  );
};

const ButtonsContainer: React.FC<ButtonsContainerProps> = (props) => {
  return (
    <>
      {props.isLoading ? (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size="large" color={Colors.greenMain} />
        </View>
      ) : (
        <View style={styles.buttonsContainer}>
          <ButtonComponent
            title="SIGN IN"
            onPress={() => {
              props.signInHandler(props.login, props.password);
            }}
            buttonContainerStyle={styles.buttonContainer}
          />
          <ButtonComponent
            title="SIGN UP"
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}
            buttonContainerStyle={styles.buttonContainer}
            buttonStyle={{backgroundColor: Colors.grayBackground}}
          />
        </View>
      )}
    </>
  );
};

const TouchableImage: React.FC<TouchableImageProps> = (props) => {
  return (
    <TouchableOpacity>
      <Image source={props.source} style={styles.socialMediaIcon} />
    </TouchableOpacity>
  );
};

const SocialMediaAuthContainer: React.FC = (props) => {
  return (
    <View style={styles.socialMediaContainer}>
      <TouchableImage source={require('../../assets/images/fbIcon.png')} />
      <TouchableImage source={require('../../assets/images/twitterIcon.png')} />
      <TouchableImage source={require('../../assets/images/instIcon.png')} />
      <TouchableImage source={require('../../assets/images/googleIcon.png')} />
    </View>
  );
};

const LoginScreen: React.FC<LoginScreenProps> = (props) => {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isCheckActive, setCheckActive] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<null | string>();
  const dispatch = useDispatch();

  const signInHandler = async (email: string, password: string) => {
    setLoginError(null);
    setIsLoading(true);
    try {
      Keyboard.dismiss();
      let result: serverResponse = await AuthAPI.login(email, password);
      if (result.statusCode === 200) {
        await dispatch(
          authActions.login(result.data.id, result.data.access_token),
        );
        Global.resetNavigationStack(props.navigation, 'TabNavigator');
      } else {
        Global.errorHandler(result);
      }
    } catch (err) {
      setLoginError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (loginError) {
      Alert.alert('Somethin went wrong', loginError, [{text: 'OK'}]);
    }
  }, [loginError]);

  return (
    <KeyboardAvoidingComponent>
      <View style={styles.screen}>
        <Header />
        <View style={{flex: 1}}></View>
        <View style={{paddingHorizontal: 17, marginBottom: 20}}>
          <InputFields
            login={login}
            password={password}
            setLogin={setLogin}
            setPassword={setPassword}
          />
          <View style={styles.checkBoxInfoContainer}>
            <CheckBox enabled={isCheckActive} setCheckActive={setCheckActive} />
            <ResetPasswordComponent />
          </View>
          <ButtonsContainer
            isLoading={isLoading}
            signInHandler={signInHandler}
            navigation={props.navigation}
            login={login}
            password={password}
          />
          <Text style={styles.orLoginText}>  </Text>
          {/* Or login with */}
          <SocialMediaAuthContainer />
        </View>
      </View>
    </KeyboardAvoidingComponent>
  );
};

export const screenOptions = (navData: any) => {
  return {
    headerTitle: '',
  };
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
    marginTop: 58,
    marginBottom: 41,
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
    justifyContent: 'space-between',
  },
  rememberMeText: {
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.white,
  },
  forgotText: {
    fontSize: 15,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.blue,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 47,
  },
  orLoginText: {
    fontSize: 22,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.whiteTitle,
    alignSelf: 'center',
    marginBottom: 38,
  },
  socialMediaIcon: {
    width: 63,
    height: 58,
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  activityIndicator: {
    height: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 0,
    width: 155,
  },
});

export default LoginScreen;
