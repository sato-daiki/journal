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
import * as StatusBar from 'expo-status-bar';
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
} from 'react-native-google-mobile-ads';
import I18n from '@/utils/I18n';
import { Diary, Human, User } from '@/types';
import AiCheck from '@/components/organisms/AiCheck';
import { MyDiaryNavigationProp } from '@/screens/MyDiaryTab/MyDiaryScreen';
import MyDiaryHeaderTitle, {
  MyDiaryPickerItem,
  WhichDiaryKey,
  myDiaryItems,
} from '../MyDiaryHeaderTitle';
import { PickerItem } from '@/components/molecules/ModalPicker';
import { ViewMyDiaryNavigationProp } from '@/screens/Modal/ViewMyDiaryScreen/ViewMyDiaryScreen';
import { LoadingModal } from '@/components/atoms';
import { LoadingWhite } from '@/images';
import firestore from '@react-native-firebase/firestore';
import { transparentBlack } from '@/styles/Common';
import {
  AiName,
  addAiCheckError,
  getProWritingAid,
  getSapling,
} from '@/utils/grammarCheck';
import { MyDiaryCaller } from '@/navigations/MyDiaryTabNavigator';
import { logAnalytics } from '@/utils/Analytics';

interface Props {
  isView: boolean;
  isPremium: boolean;
  caller?: MyDiaryCaller;
  navigation: MyDiaryNavigationProp | ViewMyDiaryNavigationProp;
  diary: Diary;
  user: User;
  setUser: (user: User) => void;
  editDiary: (objectID: string, diary: Diary) => void;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
}

export type ConfigAiCheck = {
  activeSapling: boolean;
  activeProWritingAid: boolean;
  activeHuman: boolean;
};

const IOS_AD_REWARD = 'ca-app-pub-0770181536572634/6050230343';
const ANDROID_AD_REWARD = 'ca-app-pub-0770181536572634/2143323663';

const adUnitId = Platform.OS === 'ios' ? IOS_AD_REWARD : ANDROID_AD_REWARD;
const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

const MyDiary: React.FC<Props> = ({
  isView,
  isPremium,
  caller,
  navigation,
  diary,
  user,
  setUser,
  editDiary,
  checkPermissions,
  goToRecord,
  onPressRevise,
}) => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const loaded = useRef<boolean>(false);
  const pressKey = useRef<WhichDiaryKey>();
  const pressAiName = useRef<AiName>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [configAiCheck, setConfigAiCheck] = useState<ConfigAiCheck>({
    activeSapling: false,
    activeHuman: false,
    activeProWritingAid: false,
  });
  const [successSapling, setSuccessSapling] = useState(false);
  const [successProWritingAid, setSuccessProWritingAid] = useState(false);

  const hasRevised = useMemo(
    () => !!diary.reviseTitle || !!diary.reviseText,
    [diary.reviseText, diary.reviseTitle],
  );

  const [selectedItem, setSelectedItem] = useState<MyDiaryPickerItem>(
    hasRevised ? myDiaryItems[1] : myDiaryItems[0],
  );

  useEffect(() => {
    if (caller === 'PostReviseDiary' && hasRevised) {
      setSelectedItem(myDiaryItems[1]);
    }
  }, [caller, hasRevised]);

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
        showSaplingCheck();
      },
    );
    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (_reward) => {
        // 獲得後
        aiCheck();
      },
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        StatusBar.setStatusBarHidden(false, 'none');
      },
    );

    // 初回と、アプリ立ち上げ両方で呼ぶ
    getConfigAiCheck();

    return () => {
      subscription.remove();
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
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

  const onPressItem = useCallback((item: PickerItem) => {
    setSelectedItem(item as MyDiaryPickerItem);
  }, []);

  const onPressAdReward = useCallback((key: WhichDiaryKey, aiName: AiName) => {
    setIsAdLoading(true);
    logAnalytics('on_press_ad_reward');
    loaded.current = false;
    rewarded.load();
    pressKey.current = key;
    pressAiName.current = aiName;
    setTimeout(() => {
      setIsAdLoading(false);
      if (loaded.current === false) {
        logAnalytics('on_press_ad_reward_error');
        Toast.show(I18n.t('myDiary.adRewardError'), {
          duration: Toast.durations.SHORT,
          position: Toast.positions.TOP,
        });
      }
    }, 6000);
  }, []);

  const onPressBecome = useCallback(() => {
    // @ts-ignore
    navigation.navigate('ModalBecomePremium', { screen: 'BecomePremium' });
  }, [navigation]);

  const showSaplingCheck = useCallback(async () => {
    try {
      logAnalytics('show_ad_reward');
      StatusBar.setStatusBarHidden(true, 'none');
      await rewarded.show();
    } catch (err: any) {
      logAnalytics('err_show_ad_reward');
      StatusBar.setStatusBarHidden(false, 'none');
      Toast.show(I18n.t('myDiary.adRewardError'), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.TOP,
      });
    }
  }, []);

  const showError = useCallback(async () => {
    if (pressAiName.current && pressKey.current && diary.objectID) {
      await addAiCheckError(
        pressAiName.current,
        pressKey.current,
        'MyDiary',
        diary.uid,
        diary.objectID,
      );
    }
  }, [diary.objectID, diary.uid]);

  const aiCheck = useCallback(async () => {
    // 広告最後までみた人 or プレミアム会員が実行できる処理
    if (!diary || !diary.objectID) return;

    setIsLoading(true);
    const isTitleSkip = !!diary.themeCategory && !!diary.themeSubcategory;

    let aiInfo;

    if (pressAiName.current === 'Sapling') {
      if (pressKey.current === 'original') {
        logAnalytics('get_sapling_origin');
        const sapling = await getSapling(
          diary.longCode,
          isTitleSkip,
          diary.title,
          diary.text,
        );
        aiInfo = sapling ? { sapling } : undefined;
        if (
          sapling &&
          (sapling.titleResult === 'error' || sapling.textResult === 'error')
        ) {
          await showError();
        }
      } else {
        logAnalytics('get_sapling_revise');
        const sapling = await getSapling(
          diary.longCode,
          isTitleSkip,
          diary.reviseTitle || diary.title,
          diary.reviseText || diary.text,
        );
        aiInfo = sapling ? { reviseSapling: sapling } : undefined;
        if (
          sapling &&
          (sapling.titleResult === 'error' || sapling.textResult === 'error')
        ) {
          await showError();
        }
      }
    } else if (pressAiName.current === 'ProWritingAid') {
      if (pressKey.current === 'original') {
        logAnalytics('get_pro_writing_aid_origin');
        const proWritingAid = await getProWritingAid(
          diary.longCode,
          isTitleSkip,
          diary.title,
          diary.text,
        );
        aiInfo = proWritingAid ? { proWritingAid } : undefined;
        if (
          proWritingAid &&
          (proWritingAid.titleResult === 'error' ||
            proWritingAid.textResult === 'error')
        ) {
          await showError();
        }
      } else {
        logAnalytics('get_pro_writing_aid_revise');
        const proWritingAid = await getProWritingAid(
          diary.longCode,
          isTitleSkip,
          diary.reviseTitle || diary.title,
          diary.reviseText || diary.text,
        );
        aiInfo = proWritingAid
          ? { reviseProWritingAid: proWritingAid }
          : undefined;
        if (
          proWritingAid &&
          (proWritingAid.titleResult === 'error' ||
            proWritingAid.textResult === 'error')
        ) {
          await showError();
        }
      }
    }

    await firestore()
      .doc(`diaries/${diary.objectID}`)
      .update({
        ...aiInfo,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
    editDiary(diary.objectID, {
      ...diary,
      ...aiInfo,
    });
    setIsLoading(false);
    if (pressAiName.current === 'Sapling') {
      setSuccessSapling(true);
    } else if (pressAiName.current === 'ProWritingAid') {
      setSuccessProWritingAid(true);
    }
  }, [diary, editDiary, showError]);

  const onPressCheck = useCallback(
    (key: WhichDiaryKey, aiName: AiName) => {
      logAnalytics('on_press_check_premium');
      pressKey.current = key;
      pressAiName.current = aiName;
      aiCheck();
    },
    [aiCheck],
  );

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
      {selectedItem.value == 'original' ? (
        <AiCheck
          isOriginal
          isPremium={isPremium}
          hideFooterButton={isView || hasRevised}
          diary={diary}
          title={diary.title}
          text={diary.text}
          languageTool={diary.languageTool}
          sapling={diary.sapling}
          proWritingAid={diary.proWritingAid}
          user={user}
          setUser={setUser}
          editDiary={editDiary}
          successSapling={successSapling}
          successProWritingAid={successProWritingAid}
          configAiCheck={configAiCheck}
          checkPermissions={checkPermissions}
          goToRecord={goToRecord}
          onPressRevise={onPressRevise}
          onPressCheck={(aiName: AiName) => onPressCheck('original', aiName)}
          onPressAdReward={(aiName: AiName) =>
            onPressAdReward('original', aiName)
          }
          onPressBecome={onPressBecome}
        />
      ) : (
        <AiCheck
          isOriginal={false}
          isPremium={isPremium}
          hideFooterButton={isView}
          diary={diary}
          title={diary.reviseTitle || diary.title}
          text={diary.reviseText || diary.text}
          languageTool={diary.reviseLanguageTool}
          sapling={diary.reviseSapling}
          proWritingAid={diary.reviseProWritingAid}
          user={user}
          setUser={setUser}
          editDiary={editDiary}
          successSapling={successSapling}
          successProWritingAid={successProWritingAid}
          configAiCheck={configAiCheck}
          checkPermissions={checkPermissions}
          goToRecord={goToRecord}
          onPressRevise={onPressRevise}
          onPressCheck={(aiName: AiName) => onPressCheck('revised', aiName)}
          onPressAdReward={(aiName: AiName) =>
            onPressAdReward('revised', aiName)
          }
          onPressBecome={onPressBecome}
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
