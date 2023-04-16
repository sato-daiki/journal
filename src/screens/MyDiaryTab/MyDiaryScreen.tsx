import React, { useCallback, useState, useEffect, ReactNode } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Audio } from 'expo-av';

import {
  LoadingModal,
  HeaderIcon,
  HeaderText,
  DefaultHeaderBack,
} from '@/components/atoms';
import Posted from '@/components/organisms/Posted';
import FairCopy from '@/components/organisms/FairCopy';
import FairCopyEdit from '@/components/organisms/FairCopyEdit';
import { MyDiaryTabBar } from '@/components/molecules';

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

const initialLayout = { width: Dimensions.get('window').width };

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
  const initFairCopyTitle = useCallback((): string => {
    if (diary === undefined) return '';
    return diary.fairCopyTitle || diary.title;
  }, [diary]);

  const initFairCopyText = useCallback((): string => {
    if (!diary) return '';
    return diary.fairCopyText || diary.text;
  }, [diary]);

  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalAlertAudio, setIsModalAlertAudio] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isFirstEdit, setIsFirstEdit] = useState(false);
  const [isModalConfirmation, setIsModalConfirmation] = useState(false); // 閉じる押した時
  const [fairCopyTitle, setFairCopyTitle] = useState<string>(
    initFairCopyTitle(),
  );
  const [fairCopyText, setFairCopyText] = useState<string>(initFairCopyText());

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posted', title: I18n.t('myDiary.posted') },
    { key: 'fairCopy', title: I18n.t('myDiary.fairCopy') },
  ]);

  const showModalDelete = useCallback((i?: number) => {
    switch (i) {
      case 0:
        setIsModalDelete(true);
        break;
      default:
    }
  }, []);

  const onPressMore = useCallback(() => {
    const options = [I18n.t('myDiary.menuDelete'), I18n.t('common.cancel')];
    showActionSheetWithOptions(
      {
        options,
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      showModalDelete,
    );
  }, [showActionSheetWithOptions, showModalDelete]);

  const onPressSubmit = useCallback(async (): Promise<void> => {
    if (!diary || !diary.objectID || isLoading) return;

    setIsLoading(true);

    await updateDoc(doc(db, 'diaries', diary.objectID), {
      fairCopyTitle,
      fairCopyText,
      updatedAt: serverTimestamp(),
    });

    editDiary(diary.objectID, { ...diary, fairCopyTitle, fairCopyText });
    setIsLoading(false);
    setIsEditing(false);
  }, [diary, editDiary, fairCopyText, fairCopyTitle, isLoading]);

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
    setFairCopyTitle(initFairCopyTitle());
    setFairCopyText(initFairCopyText());
    setIsModalConfirmation(false);
  }, [initFairCopyText, initFairCopyTitle]);

  const onPressClose = useCallback((): void => {
    if (isFirstEdit) {
      setIsModalConfirmation(true);
    } else {
      onClose();
    }
  }, [isFirstEdit, onClose]);

  const onPressBack = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const onPressEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const headerRight = useCallback((): ReactNode => {
    if (!isEditing) {
      if (index === 0) {
        return (
          <HeaderIcon
            icon='community'
            name='dots-horizontal'
            onPress={onPressMore}
          />
        );
      }
      if (index === 1) {
        return (
          <HeaderText text={I18n.t('common.edit')} onPress={onPressEdit} />
        );
      }
      return <View />;
    }
    if (!isFirstEdit || index === 0) {
      return null;
    }
    return <HeaderText text={I18n.t('common.done')} onPress={onPressSubmit} />;
  }, [index, isEditing, isFirstEdit, onPressEdit, onPressMore, onPressSubmit]);

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
      headerRight,
    });
  }, [diary, headerLeft, headerRight, navigation]);

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

  const goToRecommend = useCallback((): void => {
    const url = 'https://note.com/interchao/n/nd0a563f2edd4';
    navigation.navigate('RecommendedMethod', { url });
  }, [navigation]);

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

  const onChangeTextTitle = useCallback((title: string) => {
    setFairCopyTitle(title);
  }, []);

  const onChangeTextText = useCallback((text: string) => {
    setFairCopyText(text);
  }, []);

  const onFocusFairCopyEdit = useCallback(() => {
    setIsFirstEdit(true);
  }, []);

  const renderScene = useCallback(
    ({ route }) => {
      if (!diary) return null;
      switch (route.key) {
        case 'posted':
          return <Posted user={user} diary={diary} />;
        case 'fairCopy':
          return !isEditing ? (
            <FairCopy
              diary={diary}
              user={user}
              goToRecord={goToRecord}
              goToRecommend={goToRecommend}
              checkPermissions={checkPermissions}
            />
          ) : (
            <FairCopyEdit
              title={fairCopyTitle}
              text={fairCopyText}
              onChangeTextTitle={onChangeTextTitle}
              onChangeTextText={onChangeTextText}
              onFocus={onFocusFairCopyEdit}
            />
          );
        default:
          return null;
      }
    },
    [
      checkPermissions,
      diary,
      fairCopyText,
      fairCopyTitle,
      goToRecommend,
      goToRecord,
      isEditing,
      onChangeTextText,
      onChangeTextTitle,
      onFocusFairCopyEdit,
      user,
    ],
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
        initialLayout={initialLayout}
      />
    </View>
  );
};
export default connectActionSheet(MyDiaryScreen);
