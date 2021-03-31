import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import DefaultTextInput from '../../../components/profileScreen/DefaultTextInput';
import ButtonComponent from '../../../components/ButtonComponent';
import * as WalletAPI from '../../../API/WalletAPI';
import {useSelector, useDispatch} from 'react-redux';
import Clipboard from '@react-native-community/clipboard';
import * as authActions from '../../../store/actions/auth';
import {
  RequiredTextInputsProps,
  SendButtonCotainerProps,
} from './types/transactionScreen';

import {TransactionScreenProps} from './types/routing';

const RequiredTextInputs: React.FC<RequiredTextInputsProps> = (props) => {
  return (
    <>
      <DefaultTextInput
        onChangeText={(text: string) => {
          props.setAddress(text);
        }}
        value={props.address}
        placeholder="RECIPIENT ADRESS"
        placeholderTextColor={Colors.placeholder}
        autoCapitalize={'none'}
      />
      <DefaultTextInput
        onChangeText={(text: string) => {
          props.setAmount(text);
        }}
        value={props.amount}
        placeholder="AMOUNT"
        placeholderTextColor={Colors.placeholder}
        autoCapitalize={'none'}
        inputStyle={{marginBottom: 40}}
        keyboardType="numeric"
      />
    </>
  );
};

const SendButtonCotainer: React.FC<SendButtonCotainerProps> = (props) => {
  if (props.isLoading) {
    return (
      <View style={styles.activityIndicator}>
        <ActivityIndicator size="large" color={Colors.greenMain} />
      </View>
    );
  } else {
    return (
      <ButtonComponent
        title="SEND"
        buttonContainerStyle={{padding: 0}}
        onPress={props.onPress}
      />
    );
  }
};

const TransactionScreen: React.FC<TransactionScreenProps> = (props) => {
  const {type, currency} = props.route.params;
  const {token, userId} = useSelector((state) => state.auth);

  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [transactionError, setTransactionError] = useState<string | undefined>(
    undefined,
  );

  const dispatch = useDispatch();

  const sendTransactionHandler = async (
    token: string,
    amount: string,
    address: string,
    currency: any,
  ) => {
    setTransactionError(undefined);
    setIsLoading(true);
    try {
      Keyboard.dismiss();
      const result = await WalletAPI.sendTransaction(
        token,
        +amount,
        address,
        currency.main_data.data.slug.toLowerCase(),
      );
      if (result.statusCode === 401) {
        Global.resetNavigationStack(props.navigation, 'Auth');
      } else if (result.statusCode === 200) {
        dispatch(authActions.setWalletInfo(result.data));
        Alert.alert('Withdraw', 'Successful withdrawal of funds', [
          {text: 'OK'},
        ]);
      } else {
        Global.errorHandler(result);
      }
    } catch (err) {
      setTransactionError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (transactionError) {
      Alert.alert('Withdraw', transactionError, [{text: 'OK'}]);
    }
  }, [transactionError]);

  if (type === 'send') {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <View style={styles.screen}>
          <RequiredTextInputs
            amount={amount}
            address={address}
            setAddress={setAddress}
            setAmount={setAmount}
          />
          <Text style={styles.optionalText}>Optional</Text>
          <DefaultTextInput
            onChangeText={(text: string) => {
              setMemo(text);
            }}
            value={memo}
            placeholder="MEMO"
            placeholderTextColor={Colors.placeholder}
            autoCapitalize={'none'}
          />
          <SendButtonCotainer
            onPress={() => {
              sendTransactionHandler(token, amount, address, currency);
            }}
            isLoading={isLoading}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  } else {
    return (
      <View style={styles.receiveCryptoScreen}>
        <Text style={styles.adressTitle}>ADRESS:</Text>
        <TouchableOpacity
          onPress={() => {
            Clipboard.setString(currency.balances[0].address);
          }}>
          <Text style={styles.adressText}>{currency.balances[0].address}</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export const screenOptions = (navData: TransactionScreenProps) => {
  const type = navData.route.params.type;
  return {
    headerTitle: type ? 'Send' : 'Receive',
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
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    paddingHorizontal: 17,
    paddingVertical: 20,
  },
  optionalText: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: '#72757C',
    marginBottom: 15,
  },
  adressTitle: {
    fontSize: 26,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.white,
    marginBottom: 15,
  },
  adressText: {
    fontSize: 16,
    fontFamily: Global.fonts.BALSAMIQ_REGULAR,
    color: Colors.greenMain,
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
  receiveCryptoScreen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
    alignItems: 'center',
  },
  activityIndicator: {
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TransactionScreen;
