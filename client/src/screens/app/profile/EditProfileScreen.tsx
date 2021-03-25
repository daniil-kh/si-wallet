import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, Image, ScrollView} from 'react-native';
import Colors from '../../../constants/Colors';
import * as Global from '../../../Global';
import InfoCard from '../../../components/profileScreen/InfoCard';
import UserPreviewCard from '../../../components/profileScreen/UserPreviewCard';
import InfoChecksCard from '../../../components/profileScreen/InfoChecksCard';
import DoneButton from '../../../components/profileScreen/DoneButton';
import * as authActions from '../../../store/actions/auth';
import {useDispatch, useSelector} from 'react-redux';
import {
  getUserPersonalInfo,
  getUserAdditionalInfo,
  userAdditionalInfo,
  userPersonalInfo,
} from '../../../schemes/index';

import {EditProfileScreenProps} from './types/routing';

const EditProfileScreen: React.FC<EditProfileScreenProps> = (props) => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getContentList = useCallback(
    (type: string): userAdditionalInfo[] | userPersonalInfo[] => {
      if (type === 'personalInfo') {
        return getUserPersonalInfo(user);
      } else {
        return getUserAdditionalInfo(props.notifications);
      }
    },
    [user],
  );

  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.blackBackground}}>
      <UserPreviewCard
        userName={user?.accountInfo.name + ' ' + user?.accountInfo.surname}
        userBalance={user?.balanceInfo.totalBalance}
        cardStyle={styles.previewCard}
        isButtonsEnabled={false}
      />
      <InfoCard
        contentList={() => {
          getContentList('personalInfo');
        }}
        title="Account Info"
        cardStyle={styles.accountInfoCard}
        isEditEnabled={true}
        onEditPress={() => {
          props.navigation.navigate('EnterUserInfo', {
            name: user?.accountInfo.name,
            surname: user?.accountInfo.surname,
          });
        }}
      />
      <InfoChecksCard
        contentList={() => {
          getContentList('additionalInfo');
        }}
        title="Settings"
        cardStyle={styles.additionalInfoCard}
      />
      <DoneButton
        onPress={() => {
          props.navigation.goBack();
        }}
        title="Done"
        buttonStyle={{marginBottom: 5}}
      />
      <DoneButton
        onPress={() => {
          dispatch(authActions.logout());
          Global.resetNavigationStack(props.navigation, 'Auth');
        }}
        buttonStyle={{backgroundColor: '#F0542B'}}
        title="Exit"
      />
    </ScrollView>
  );
};

export const screenOptions = (navData: EditProfileScreenProps) => {
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
  accountInfoCard: {
    marginBottom: 24,
    height: 178,
  },
  additionalInfoCard: {
    marginBottom: 24,
    height: 160,
  },
  previewCard: {
    marginTop: 20,
    marginBottom: 24,
  },
});

export default EditProfileScreen;
