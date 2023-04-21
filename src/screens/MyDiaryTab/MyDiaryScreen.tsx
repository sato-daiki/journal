import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

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
import {
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from '@firebase/firestore';
import { db } from '@/constants/firebase';
import ModalConfirm from '@/components/organisms/ModalConfirm';

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

  const onPressDelete = useCallback(async () => {
    if (!diary || !diary.objectID) return;
    setIsLoading(true);
    await deleteDoc(doc(db, 'diaries', diary.objectID));
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
      <Posted user={user} diary={diary} />
    </View>
  );
};
export default connectActionSheet(MyDiaryScreen);
