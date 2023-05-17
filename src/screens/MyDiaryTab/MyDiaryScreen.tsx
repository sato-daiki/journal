import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  AppState,
  AppStateStatus,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { LoadingModal, HeaderIcon } from '@/components/atoms';
import Toast from 'react-native-root-toast';
import {
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';

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
import { LoadingWhite } from '@/images';
import { getSapling } from '@/utils/grammarCheck';

export interface Props {
  diary?: Diary;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  deleteDiary: (objectID: string) => void;
}

type MyDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyDiaryTabStackParamList, 'MyDiary'>,
  MyDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: MyDiaryNavigationProp;
} & Props &
  DispatchProps;

type ConfigAiCheck = {
  activeSapling: boolean;
};

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

export type Key = 'revised' | 'origin';

const IOS_AD_REWARD = 'ca-app-pub-0770181536572634/6050230343';
const ANDROID_AD_REWARD = 'ca-app-pub-0770181536572634/2143323663';

const adUnitId = Platform.OS === 'ios' ? IOS_AD_REWARD : ANDROID_AD_REWARD;
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const MyDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  diary,
  deleteDiary,
  editDiary,
}) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const { showActionSheetWithOptions } = useActionSheet();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isModalAlertAudio, setIsModalAlertAudio] = useState(false);
  const [isModalConfirmation, setIsModalConfirmation] = useState(false); // 閉じる押した時
  const [isAdLoading, setIsAdLoading] = useState(false);
  const loaded = useRef<boolean>(false);
  const pressKey = useRef<Key>();

  const [successSapling, setSuccessSapling] = useState(false);
  const [configAiCheck, setConfigAiCheck] = useState<ConfigAiCheck>({
    activeSapling: false,
  });

  useEffect(() => {
    // saplingを外から止めるため
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setIsAdLoading(false);
        loaded.current = true;
        showAdReward();
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (_reward) => {
        // 獲得後
        earnedReward();
      },
    );

    // 初回と、アプリ立ち上げ両方で呼ぶ
    getConfigAiCheck();

    return () => {
      subscription.remove();
      unsubscribeLoaded();
      unsubscribeEarned();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getConfigAiCheck = useCallback(async () => {
    const doc = await firestore().doc('config/aiCheck').get();
    const data = doc.data() as ConfigAiCheck;
    setConfigAiCheck(data);
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    console.log('[handleAppStateChange]', nextAppState);
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getConfigAiCheck();
    }
    appState.current = nextAppState;
  };

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
      title: diary ? diary.title : '',
      headerRight,
    });
  }, [diary, headerRight, navigation]);

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

  const onPressAdReward = useCallback((key: Key) => {
    setIsAdLoading(true);
    loaded.current = false;
    rewarded.load();
    pressKey.current = key;
    setTimeout(() => {
      setIsAdLoading(false);
      if (loaded.current === false) {
        Toast.show(I18n.t('myDiary.adRewardError'), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    }, 6000);
  }, []);

  const showAdReward = useCallback(async () => {
    try {
      await rewarded.show();
    } catch (err: any) {
      Toast.show(I18n.t('myDiary.adRewardError'), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  }, []);

  const earnedReward = useCallback(async () => {
    // 広告最後までみた人が実行できる処理
    if (!diary || !diary.objectID) return;

    setIsLoading(true);
    const isTitleSkip = !!diary.themeCategory && !!diary.themeSubcategory;

    let saplingInfo;

    if (pressKey.current === 'origin') {
      const sapling = await getSapling(
        diary.longCode,
        isTitleSkip,
        diary.title,
        diary.text,
      );
      saplingInfo = sapling ? { sapling } : undefined;
    } else {
      const sapling = await getSapling(
        diary.longCode,
        isTitleSkip,
        diary.reviseTitle || diary.title,
        diary.reviseText || diary.text,
      );
      saplingInfo = sapling ? { reviseSapling: sapling } : undefined;
    }

    await firestore()
      .doc(`diaries/${diary.objectID}`)
      .update({
        ...saplingInfo,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    editDiary(diary.objectID, {
      ...diary,
      ...saplingInfo,
    });
    setIsLoading(false);
    setSuccessSapling(true);
  }, [diary, editDiary]);

  if (!diary) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LoadingModal visible={isLoading} />
      <LoadingModal
        visible={isAdLoading}
        text={I18n.t('myDiary.adLoading')}
        source={LoadingWhite}
        containerStyle={styles.adContainerStyle}
        textStyle={styles.adTextStyle}
      />
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
        diary={diary}
        editDiary={editDiary}
        checkPermissions={checkPermissions}
        goToRecord={goToRecord}
        onPressRevise={onPressRevise}
        onPressAdReward={onPressAdReward}
        successSapling={successSapling}
        activeSapling={configAiCheck.activeSapling}
      />
    </View>
  );
};
export default connectActionSheet(MyDiaryScreen);
