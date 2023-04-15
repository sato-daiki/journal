import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { primaryColor, subTextColor, fontSizeS } from '../../styles/Common';
import { User } from '../../types';
import {
  SmallButtonWhite,
  Space,
  UserPoints,
  HeaderIcon,
  LoadingModal,
} from '../../components/atoms';
import I18n from '../../utils/I18n';
import {
  MyPageTabStackParamList,
  MyPageTabNavigationProp,
} from '../../navigations/MyPageTabNavigator';
import ModalAdPointsGet from '@/components/organisms/ModalAdPointsGet';
import { useAdMobRewarded } from '../hooks/useAdMobRewarded';
import { checkHourDiff, getActiveHour } from '@/utils/time';
import {
  Timestamp,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { db } from '@/constants/firebase';
import { getLanguage } from '@/utils/diary';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
}

type MyPageNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyPageTabStackParamList, 'MyPage'>,
  MyPageTabNavigationProp
>;

type ScreenType = {
  navigation: MyPageNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 16,
  },
  main: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeOut: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
    color: subTextColor,
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  label: {
    fontSize: fontSizeS,
    color: subTextColor,
    paddingLeft: 2,
    paddingRight: 16,
  },
  language: {
    fontSize: fontSizeS,
    color: primaryColor,
    marginRight: 8,
  },
});

const CHECK_HOUR = 3;

/**
 * マイページ
 */
const MyPageScreen: React.FC<ScreenType> = ({ navigation, user, setUser }) => {
  const [isModalAdPointsGet, setIsModalAdPointsGet] = useState(false);

  const isActiveAdPointsGet = useMemo(() => {
    return checkHourDiff(user.lastWatchAdAt, CHECK_HOUR);
  }, [user.lastWatchAdAt]);

  const activeHour = useMemo(() => {
    return getActiveHour(user.lastWatchAdAt, CHECK_HOUR);
  }, [user.lastWatchAdAt]);

  const handleDidEarnReward = useCallback(async () => {
    // 広告をみた人が実行できる処理
    await updateDoc(doc(db, 'users', user.uid), {
      points: user.points + 10,
      lastWatchAdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    setUser({
      ...user,
      points: user.points + 10,
      lastWatchAdAt: Timestamp.now(),
    });
    setIsModalAdPointsGet(true);
  }, [setUser, user]);

  const { isLoading, showAdReward } = useAdMobRewarded({
    handleDidEarnReward,
  });
  const onPressAdPointGet = useCallback(() => {
    showAdReward();
  }, [showAdReward]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderIcon
          icon='material'
          name='settings'
          onPress={(): void => navigation.navigate('Setting')}
        />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressEdit = useCallback(() => {
    navigation.navigate('ModalEditMyProfile', { screen: 'EditMyProfile' });
  }, [navigation]);

  const onPressCloseAdPointsGet = useCallback(() => {
    setIsModalAdPointsGet(false);
  }, []);

  const renderButton = useCallback(() => {
    if (isActiveAdPointsGet) {
      return (
        <SmallButtonWhite
          disable={!isActiveAdPointsGet}
          color={primaryColor}
          title={I18n.t('myPage.adGetPoints', { points: 10 })}
          onPress={onPressAdPointGet}
        />
      );
    }

    return (
      <Text style={styles.timeOut}>
        {I18n.t('myPage.timeOut', { activeHour: activeHour })}
      </Text>
    );
  }, [activeHour, isActiveAdPointsGet, onPressAdPointGet]);

  return (
    <ScrollView style={styles.container}>
      <ModalAdPointsGet
        visible={isModalAdPointsGet}
        points={user.points}
        getPoints={10}
        onPressClose={onPressCloseAdPointsGet}
      />
      <LoadingModal visible={isLoading} text='loading' />
      <View style={styles.main}>
        <View style={styles.row}>
          <UserPoints points={user.points} />
          {renderButton()}
        </View>
        <Space size={16} />
        <View style={styles.languageContainer}>
          <MaterialCommunityIcons
            size={14}
            color={subTextColor}
            name='pencil'
          />
          <Text style={styles.label}>{I18n.t('profileLanguage.learn')}</Text>
          <Text style={styles.language}>{getLanguage(user.learnLanguage)}</Text>
        </View>
        <Space size={16} />
        <SmallButtonWhite
          title={I18n.t('myPage.editButton')}
          onPress={onPressEdit}
        />
      </View>
    </ScrollView>
  );
};

export default MyPageScreen;
