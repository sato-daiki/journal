import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState, AppStateStatus, Platform, StyleSheet } from 'react-native';
import Toast from 'react-native-root-toast';
import {
  RewardedAd,
  RewardedAdEventType,
} from 'react-native-google-mobile-ads';
import I18n from '@/utils/I18n';
import { Diary } from '@/types';
import AiCheck from '@/components/organisms/AiCheck';
import { MyDiaryNavigationProp } from '@/screens/MyDiaryTab/MyDiaryScreen';
import MyDiaryHeaderTitle, {
  MyDiaryPickerItem,
  myDiaryItems,
} from '../MyDiaryHeaderTitle';
import { PickerItem } from '@/components/molecules/ModalPicker';
import { ViewMyDiaryNavigationProp } from '@/screens/Modal/ViewMyDiaryScreen/ViewMyDiaryScreen';
import { LoadingModal } from '@/components/atoms';
import { LoadingWhite } from '@/images';
import firestore from '@react-native-firebase/firestore';
import { transparentBlack } from '@/styles/Common';
import { getSapling } from '@/utils/grammarCheck';

interface Props {
  isView: boolean;
  navigation: MyDiaryNavigationProp | ViewMyDiaryNavigationProp;
  diary: Diary;
  editDiary: (objectID: string, diary: Diary) => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
}

export type Key = 'revised' | 'origin';

type ConfigAiCheck = {
  activeSapling: boolean;
};

const IOS_AD_REWARD = 'ca-app-pub-0770181536572634/6050230343';
const ANDROID_AD_REWARD = 'ca-app-pub-0770181536572634/2143323663';

const adUnitId = Platform.OS === 'ios' ? IOS_AD_REWARD : ANDROID_AD_REWARD;
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const MyDiary: React.FC<Props> = ({
  isView,
  navigation,
  diary,
  editDiary,
  checkPermissions,
  goToRecord,
  onPressRevise,
}) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const loaded = useRef<boolean>(false);
  const pressKey = useRef<Key>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [configAiCheck, setConfigAiCheck] = useState<ConfigAiCheck>({
    activeSapling: false,
  });
  const [successSapling, setSuccessSapling] = useState(false);

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

  const hasRevised = useMemo(
    () => !!diary.reviseTitle || !!diary.reviseText,
    [diary.reviseText, diary.reviseTitle],
  );

  const [selectedItem, setSelectedItem] = useState<MyDiaryPickerItem>(
    hasRevised ? myDiaryItems[1] : myDiaryItems[0],
  );

  const onPressItem = useCallback((item: PickerItem) => {
    setSelectedItem(item as MyDiaryPickerItem);
  }, []);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <MyDiaryHeaderTitle
          hasRevised={hasRevised}
          selectedItem={selectedItem}
          onPressItem={onPressItem}
        />
      ),
    });
  }, [hasRevised, navigation, onPressItem, selectedItem]);

  if (!diary) return null;

  return (
    <>
      <LoadingModal visible={isLoading} />
      <LoadingModal
        visible={isAdLoading}
        text={I18n.t('myDiary.adLoading')}
        source={LoadingWhite}
        containerStyle={styles.adContainerStyle}
        textStyle={styles.adTextStyle}
      />
      {selectedItem.value == 'origin' ? (
        <AiCheck
          hideFooterButton={isView || hasRevised}
          diary={diary}
          title={diary.title}
          text={diary.text}
          languageTool={diary.languageTool}
          sapling={diary.sapling}
          editDiary={editDiary}
          successSapling={successSapling}
          activeSapling={configAiCheck.activeSapling}
          checkPermissions={checkPermissions}
          goToRecord={goToRecord}
          onPressRevise={onPressRevise}
          onPressAdReward={() => onPressAdReward && onPressAdReward('origin')}
        />
      ) : (
        <AiCheck
          hideFooterButton={isView}
          diary={diary}
          title={diary.reviseTitle || diary.title}
          text={diary.reviseText || diary.text}
          languageTool={diary.reviseLanguageTool}
          sapling={diary.reviseSapling}
          editDiary={editDiary}
          successSapling={successSapling}
          activeSapling={configAiCheck.activeSapling}
          checkPermissions={checkPermissions}
          goToRecord={goToRecord}
          onPressRevise={onPressRevise}
          onPressAdReward={() => onPressAdReward && onPressAdReward('revised')}
        />
      )}
    </>
  );
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

export default MyDiary;
