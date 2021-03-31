import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import InfoCard from '../../../components/profileScreen/InfoCard';
import UserPreviewCard from '../../../components/profileScreen/UserPreviewCard';
import {useSelector, useDispatch} from 'react-redux';
import * as UserAPI from '../../../API/UserAPI';
import * as authActions from '../../../store/actions/auth';
import LoadingScreen from '../../../components/LoadingScreen';
import ErrorScreen from '../../../components/ErrorScreen';
import {
  getUserPersonalInfo,
  getUserBalanceInfo,
  userBalanceInfo,
  userPersonalInfo,
} from '../../../schemes/profileScreen';

import {ProfileScreenProps} from './types/routing';

const ProfileScreen: React.FC<ProfileScreenProps> = (props) => {
  let {userId, token, user} = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | undefined>(undefined);

  const dispatch = useDispatch();

  const loadUserinfo = useCallback(
    async (token: string) => {
      setIsLoading(true);
      setLoadingError(undefined);
      try {
        const result = await UserAPI.getUserInfo(token);
        if (result.statusCode === 401) {
          Global.resetNavigationStack(props.navigation, 'Auth');
        } else if (result.statusCode === 200) {
          dispatch(authActions.setUserInfo(result.data));
        } else {
          Global.errorHandler(result);
        }
      } catch (err) {
        setLoadingError(err.message);
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    [dispatch],
  );

  useEffect(() => {
    loadUserinfo(token);
  }, [userId, token]);

  const getContentList = useCallback(
    (type: string): userBalanceInfo[] | userPersonalInfo[] => {
      if (type === 'balance') {
        return getUserBalanceInfo(user);
      } else {
        return getUserPersonalInfo(user);
      }
    },
    [user],
  );

  if (loadingError) {
    return (
      <ErrorScreen
        isAction={true}
        errorText="An error occured while loading user info, try again"
        onErrorPress={() => {
          loadUserinfo(token);
        }}
      />
    );
  } else if (isLoading || !user) {
    return <LoadingScreen />;
  } else {
    return (
      <ScrollView style={styles.screen}>
        <UserPreviewCard
          userName={user?.accountInfo.name + ' ' + user?.accountInfo.surname}
          userBalance={user?.balanceInfo.totalBalance}
          cardStyle={styles.card}
          onManageProfilePress={() => {
            props.navigation.navigate('ProfileNavigator', {
              screen: 'EditProfile',
              params: {
                notifications: false
              }
            });
          }}
          onWalletPress={() => {
            props.navigation.navigate('ProfileNavigator', {
              screen: 'Wallet',
            });
          }}
          isButtonsEnabled={true}
        />
        <InfoCard
          contentList={() => {
            return getContentList('user');
          }}
          title="Account Info"
          cardStyle={styles.userPersonalInfoCard}
        />
        <InfoCard
          contentList={() => {
            return getContentList('balance');
          }}
          title="Balance Info"
          cardStyle={styles.userBalanceInfoCard}
        />
      </ScrollView>
    );
  }
};

export const screenOptions = (navData: ProfileScreenProps) => {
  return {
    headerTitle: 'Profile',
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.blackBackground,
  },
  card: {
    marginTop: 20,
    marginBottom: 24,
  },
  userPersonalInfoCard: {
    marginBottom: 24,
    height: 174,
  },
  userBalanceInfoCard: {
    marginBottom: 24,
    height: 244,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Global.fonts.BALSAMIQ_BOLD,
    color: Colors.whiteTitle,
  },
});

export default ProfileScreen;
