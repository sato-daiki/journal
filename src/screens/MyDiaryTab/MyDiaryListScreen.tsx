import React, {
  useLayoutEffect,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import MyDiaryListFlatList from '@/components/features/MyDiaryList/MyDiaryListFlatList';

import { Layout } from '@/components/templates';
import { LoadingModal } from '@/components/atoms';
import { LocalStatus, MyDiaryListView } from '@/types/localStatus';
import I18n from '@/utils/I18n';
import {
  MyDiaryTabStackParamList,
  MyDiaryTabNavigationProp,
} from '@/navigations/MyDiaryTabNavigator';
import { commonAlert } from '@/utils/locales/alert';
import MyDiaryListCalendar from '@/components/features/MyDiaryList/MyDiaryListCalendar';
import { User, Diary } from '@/types';
import { FetchInfoState } from '@/stores/reducers/diaryList';
import { useFirstScreen } from './useFirstScreen';
import firestore from '@react-native-firebase/firestore';
import { getDiaries, getDiaryNum, getLoadNextPage } from '@/utils/diary';
import { logAnalytics } from '@/utils/Analytics';
import HeaderIcon from '@/components/features/Header/HeaderIcon';
import HeaderText from '@/components/features/Header/HeaderText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';

export interface Props {
  user: User;
  diaries: Diary[];
  fetchInfo: FetchInfoState;
  diaryTotalNum: number;
  localStatus: LocalStatus;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
  deleteDiary: (objectID: string) => void;
  setDiaries: (diaries: Diary[]) => void;
  addDiaries: (diaries: Diary[]) => void;
  setMyDiaryListView: (myDiaryListView: MyDiaryListView) => void;
  setFetchInfo: (fetchInfo: FetchInfoState) => void;
  setDiaryTotalNum: (diaryTotalNum: number) => void;
}

type MyDiaryListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MyDiaryTabStackParamList, 'MyDiaryList'>,
  MyDiaryTabNavigationProp
>;

type ScreenType = {
  navigation: MyDiaryListNavigationProp;
} & Props &
  DispatchProps;

const HIT_PER_PAGE = 20;

/**
 * マイ日記一覧
 */
const MyDiaryListScreen: React.FC<ScreenType> = ({
  user,
  diaries,
  fetchInfo,
  diaryTotalNum,
  localStatus,
  deleteDiary,
  setDiaries,
  setDiaryTotalNum,
  addDiaries,
  setFetchInfo,
  setMyDiaryListView,
  navigation,
}) => {
  const theme = useAppTheme();
  const elRefs = useRef<Swipeable[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      if (!user.uid) {
        setIsLoading(false);
        return;
      }
      const newDiaries = await getDiaries(user.uid, new Date(), HIT_PER_PAGE);
      const newDiaryTotalNum = await getDiaryNum(user.uid);
      setDiaryTotalNum(newDiaryTotalNum);
      setDiaries(newDiaries);
      if (newDiaries.length > 0) {
        const { createdAt } = newDiaries[newDiaries.length - 1];
        setFetchInfo({
          ...fetchInfo,
          lastVisible: createdAt,
        });
      }
      setIsLoading(false);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(async (): Promise<void> => {
    if (refreshing) return;
    setRefreshing(true);
    const newDiaries = await getDiaries(user.uid, new Date(), HIT_PER_PAGE);

    setDiaries(newDiaries);
    if (newDiaries.length > 0) {
      const { createdAt } = newDiaries[newDiaries.length - 1];
      setFetchInfo({
        readingNext: false,
        readAllResults: false,
        lastVisible: createdAt,
      });
    }
    setRefreshing(false);
  }, [refreshing, setDiaries, setFetchInfo, user.uid]);

  const loadNextPage = useCallback(async (): Promise<void> => {
    getLoadNextPage(fetchInfo, setFetchInfo, user.uid, addDiaries);
  }, [fetchInfo, setFetchInfo, user.uid, addDiaries]);

  useFirstScreen({
    localStatus,
    onResponseReceived: onRefresh,
  });

  const handlePressItem = useCallback(
    async (item: Diary): Promise<void> => {
      if (!item.objectID) return;

      if (item.diaryStatus === 'draft') {
        navigation.navigate('ModalPostDraftDiary', {
          screen: 'PostDraftDiary',
          params: { item, objectID: item.objectID },
        });
      } else {
        navigation.navigate('MyDiary', {
          objectID: item.objectID,
          caller: 'MyDiaryList',
        });
      }
    },
    [navigation],
  );

  const onDeleteDiary = useCallback(
    async (item: Diary, index: number) => {
      if (!item.objectID) return;
      setIsLoading(true);
      logAnalytics('on_delete_diary_my_diary_list');
      await firestore().collection('diaries').doc(item.objectID).delete();
      deleteDiary(item.objectID);
      if (elRefs.current[index]) {
        elRefs.current[index].close();
      }
      setIsLoading(false);
    },
    [deleteDiary],
  );

  const handlePressDelete = useCallback(
    (item: Diary, index: number) => {
      commonAlert({
        title: I18n.t('common.confirmation'),
        message: I18n.t('myDiary.confirmMessage'),
        buttons: [
          {
            text: 'Cancel',
            onPress: (): void => undefined,
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: async (): Promise<void> => onDeleteDiary(item, index),
          },
        ],
        options: { cancelable: false },
      });
    },
    [onDeleteDiary],
  );

  const onPressEdit = useCallback(() => {
    navigation.navigate('ModalEditMyDiaryList', { screen: 'EditMyDiaryList' });
  }, [navigation]);

  const onPressRight = useCallback(() => {
    setMyDiaryListView(
      !localStatus.myDiaryListView || localStatus.myDiaryListView === 'list'
        ? 'calendar'
        : 'list',
    );
  }, [localStatus.myDiaryListView, setMyDiaryListView]);

  const headerLeft = useCallback(() => {
    if (diaries.length > 0) {
      return <HeaderText text={I18n.t('common.edit')} onPress={onPressEdit} />;
    }
    return null;
  }, [diaries.length, onPressEdit]);

  const headerRight = useCallback(
    () => (
      <HeaderIcon>
        <MaterialCommunityIcons
          size={28}
          name={
            !localStatus.myDiaryListView ||
            localStatus.myDiaryListView === 'list'
              ? 'calendar'
              : 'format-list-bulleted'
          }
          color={theme.colors.primary}
          onPress={onPressRight}
        />
      </HeaderIcon>
    ),
    [localStatus.myDiaryListView, onPressRight],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft,
      headerRight,
    });
  }, [headerLeft, headerRight, navigation]);

  return (
    <Layout showBottomAd>
      <LoadingModal visible={isLoading} />
      {!localStatus.myDiaryListView ||
      localStatus.myDiaryListView === 'list' ? (
        <MyDiaryListFlatList
          // emptyの時のレイアウトのため
          elRefs={elRefs}
          isEmpty={!isLoading && !refreshing && diaries.length < 1}
          refreshing={refreshing}
          diaryTotalNum={diaryTotalNum}
          diaries={diaries}
          loadNextPage={loadNextPage}
          onRefresh={onRefresh}
          handlePressItem={handlePressItem}
          handlePressDelete={handlePressDelete}
        />
      ) : (
        <MyDiaryListCalendar
          elRefs={elRefs}
          refreshing={refreshing}
          diaries={diaries}
          loadNextPage={loadNextPage}
          onRefresh={onRefresh}
          handlePressItem={handlePressItem}
          handlePressDelete={handlePressDelete}
        />
      )}
    </Layout>
  );
};

export default MyDiaryListScreen;
