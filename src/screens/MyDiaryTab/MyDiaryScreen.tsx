import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { TabView } from 'react-native-tab-view';
import { Audio } from 'expo-av';

import {
  LoadingModal,
  HeaderText,
  DefaultHeaderBack,
} from '@/components/atoms';
import Posted from '@/components/organisms/Posted';

import { Diary, LocalStatus, User } from '@/types';
import {
  MyDiaryTabNavigationProp,
  MyDiaryTabStackParamList,
} from '@/navigations/MyDiaryTabNavigator';
import I18n from '@/utils/I18n';
import firestore from '@react-native-firebase/firestore';
import ModalConfirm from '@/components/organisms/ModalConfirm';
import { MyDiaryTabBar } from '@/components/molecules';
import FairCopy from '@/components/organisms/FairCopy';

export interface Props {
  error: boolean;
  diary?: Diary;
  user: User;
  localStatus: LocalStatus;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  deleteDiary: (objectID: string) => void;
  setUser: (user: User) => void;
  setLocalStatus: (localStatus: LocalStatus) => void;
}

type MyDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyDiaryTabStackParamList, 'MyDiary'>,
  MyDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: MyDiaryNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

/**
 * 日記詳細
 */
const MyDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  user,
  diary,
  deleteDiary,
  editDiary,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalAlertAudio, setIsModalAlertAudio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalConfirmation, setIsModalConfirmation] = useState(false); // 閉じる押した時

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posted', title: I18n.t('myDiary.posted') },
    { key: 'fairCopy', title: I18n.t('myDiary.fairCopy') },
  ]);

  const onPressDelete = useCallback(async () => {
    if (!diary || !diary.objectID) return;
    setIsLoading(true);
    firestore().collection('diaries').doc(diary.objectID).delete();
    setIsModalDelete(false);
    // reduxの設定
    deleteDiary(diary.objectID);
    navigation.goBack();
    setIsLoading(false);
  }, [deleteDiary, diary, navigation]);

  const onClose = useCallback((): void => {
    setIsEditing(false);
    setIsModalConfirmation(false);
  }, []);

  const onPressClose = useCallback((): void => {
    onClose();
  }, [onClose]);

  const onPressBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const headerLeft = useCallback(
    () =>
      !isEditing ? (
        <DefaultHeaderBack onPress={onPressBack} />
      ) : (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
    [isEditing, onPressBack, onPressClose],
  );

  useEffect(() => {
    navigation.setOptions({
      title: diary ? diary.title : '',
      headerLeft,
    });
  }, [diary, headerLeft, navigation]);

  const onPressCloseModalDelete = useCallback(() => {
    setIsModalDelete(false);
  }, []);

  const onPressCloseModalConfirmation = useCallback(() => {
    setIsModalConfirmation(false);
  }, []);

  const onPressCloseModalAlertAudio = useCallback(() => {
    setIsModalAlertAudio(false);
  }, []);

  const onIndexChange = useCallback((i: number) => {
    setIndex(i);
  }, []);

  const checkPermissions = useCallback(async (): Promise<boolean> => {
    const { status } = await Audio.requestPermissionsAsync();

    if (status !== 'granted') {
      setIsModalAlertAudio(true);
      setIsLoading(false);
      return false;
    }
    return true;
  }, []);

  const goToRecord = useCallback(async (): Promise<void> => {
    if (!diary || !diary.objectID) return;

    const res = await checkPermissions();
    if (!res) return;

    navigation.navigate('ModalRecord', {
      screen: 'Record',
      params: { objectID: diary.objectID },
    });
  }, [checkPermissions, diary, navigation]);

  const renderScene = useCallback(
    ({ route }) => {
      if (!diary) return null;
      switch (route.key) {
        case 'posted':
          return <Posted user={user} diary={diary} editDiary={editDiary} />;
        case 'fairCopy':
          return !isEditing ? (
            <FairCopy
              user={user}
              diary={diary}
              goToRecord={goToRecord}
              checkPermissions={checkPermissions}
            />
          ) : (
            <Posted user={user} diary={diary} editDiary={editDiary} />
          );
        default:
          return null;
      }
    },
    [checkPermissions, diary, editDiary, goToRecord, isEditing, user],
  );

  const renderTabBar = useCallback((props) => {
    return <MyDiaryTabBar {...props} />;
  }, []);

  if (!diary) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalConfirm
        visible={isModalDelete}
        isLoading={isLoading}
        title={I18n.t('common.confirmation')}
        message={I18n.t('myDiary.confirmMessage')}
        mainButtonText={I18n.t('myDiary.menuDelete')}
        onPressMain={onPressDelete}
        onPressClose={onPressCloseModalDelete}
      />
      <ModalConfirm
        visible={isModalConfirmation}
        title={I18n.t('common.confirmation')}
        message={I18n.t('myDiary.closeAlert')}
        mainButtonText='OK'
        onPressMain={onClose}
        onPressClose={onPressCloseModalConfirmation}
      />
      <ModalConfirm
        visible={isModalAlertAudio}
        title={I18n.t('common.confirmation')}
        message={I18n.t('myDiary.permissionAudio')}
        mainButtonText='OK'
        onPressMain={onPressCloseModalAlertAudio}
        onPressClose={onPressCloseModalAlertAudio}
      />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={onIndexChange}
        // initialLayout={initialLayout}
      />
    </View>
  );
};
export default connectActionSheet(MyDiaryScreen);
