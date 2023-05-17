import React, { useCallback, useState, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { LoadingModal, HeaderIcon } from '@/components/atoms';

import { Diary } from '@/types';
import {
  MyDiaryTabNavigationProp,
  MyDiaryTabStackParamList,
} from '@/navigations/MyDiaryTabNavigator';
import I18n from '@/utils/I18n';
import firestore from '@react-native-firebase/firestore';
import ModalConfirm from '@/components/organisms/ModalConfirm';
import MyDiary from '@/components/organisms/MyDiary/MyDiary';
import { transparentBlack } from '@/styles/Common';

export interface Props {
  diary?: Diary;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  deleteDiary: (objectID: string) => void;
}

export type MyDiaryNavigationProp = CompositeNavigationProp<
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
    backgroundColor: '#fff',
  },
  adContainerStyle: {
    backgroundColor: transparentBlack,
  },
  adTextStyle: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

const MyDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  diary,
  deleteDiary,
  editDiary,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalAlertAudio, setIsModalAlertAudio] = useState(false);
  const [isModalConfirmation, setIsModalConfirmation] = useState(false); // 閉じる押した時

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
    setIsModalConfirmation(false);
  }, []);

  const onPressRevise = useCallback(() => {
    if (diary && diary.objectID) {
      navigation.navigate('ModalPostReviseDiary', {
        screen: 'PostReviseDiary',
        params: { item: diary, objectID: diary.objectID },
      });
    }
  }, [diary, navigation]);

  const showModal = useCallback(
    (i?: number) => {
      switch (i) {
        case 0:
          onPressRevise();
          break;
        case 1:
          setIsModalDelete(true);
          break;
        default:
      }
    },
    [onPressRevise],
  );

  const onPressMore = useCallback(() => {
    const options = [
      I18n.t('myDiary.menuRevise'),
      I18n.t('myDiary.menuDelete'),
      I18n.t('common.cancel'),
    ];
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
      },
      showModal,
    );
  }, [showActionSheetWithOptions, showModal]);

  const headerRight = useCallback(() => {
    return (
      <HeaderIcon
        icon='community'
        name='dots-horizontal'
        onPress={onPressMore}
      />
    );
  }, [onPressMore]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight,
    });
  }, [headerRight, navigation]);

  const onPressCloseModalDelete = useCallback(() => {
    setIsModalDelete(false);
  }, []);

  const onPressCloseModalConfirmation = useCallback(() => {
    setIsModalConfirmation(false);
  }, []);

  const onPressCloseModalAlertAudio = useCallback(() => {
    setIsModalAlertAudio(false);
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
      <MyDiary
        isView={false}
        navigation={navigation}
        diary={diary}
        editDiary={editDiary}
        checkPermissions={checkPermissions}
        goToRecord={goToRecord}
        onPressRevise={onPressRevise}
      />
    </View>
  );
};
export default connectActionSheet(MyDiaryScreen);
