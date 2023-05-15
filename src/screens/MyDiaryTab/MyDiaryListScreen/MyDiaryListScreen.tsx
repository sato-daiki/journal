import React, {
  useLayoutEffect,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { View, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import MyDiaryListFlatList from '@/components/organisms/MyDiaryList/MyDiaryListFlatList';
import {
  HeaderIcon,
  HeaderText,
  Layout,
  LoadingModal,
} from '@/components/atoms';
import { LocalStatus, MyDiaryListView } from '@/types/localStatus';
import I18n from '@/utils/I18n';
import {
  MyDiaryTabStackParamList,
  MyDiaryTabNavigationProp,
} from '@/navigations/MyDiaryTabNavigator';
import { commonAlert } from '@/utils/locales/alert';
import MyDiaryListCalendar from '@/components/organisms/MyDiaryList/MyDiaryListCalendar';
import { User, Diary } from '@/types';
import { FetchInfoState } from '@/stores/reducers/diaryList';
import { useFirstScreen } from './useFirstScreen';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import { getDiaries } from '@/utils/diary';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const HIT_PER_PAGE = 10;

/**
 * マイ日記一覧
 */
const MyDiaryListScreen: React.FC<ScreenType> = ({
  user,
  diaries,
  // fetchInfo,
  localStatus,
  deleteDiary,
  setDiaries,
  addDiaries,
  // setFetchInfo,
  setMyDiaryListView,
  navigation,
}) => {
  const elRefs = useRef<Swipeable[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const lastVisible = useRef<FirebaseFirestoreTypes.FieldValue | null>(null);
  const readingNext = useRef(false);
  const readAllResults = useRef(false);

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      const newDiaries = await getDiaries(user.uid, new Date(), HIT_PER_PAGE);
      setDiaries(newDiaries);
      if (newDiaries.length > 0) {
        const { createdAt } = newDiaries[newDiaries.length - 1];
        lastVisible.current = createdAt;
      }
      setIsLoading(false);
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(async (): Promise<void> => {
    if (refreshing) return;
    setRefreshing(true);
    readingNext.current = false;
    readAllResults.current = false;
    const newDiaries = await getDiaries(user.uid, new Date(), HIT_PER_PAGE);

    setDiaries(newDiaries);
    if (newDiaries.length > 0) {
      const { createdAt } = newDiaries[newDiaries.length - 1];
      lastVisible.current = createdAt;
    }
    setRefreshing(false);
  }, [refreshing, setDiaries, user.uid]);

  const loadNextPage = useCallback(async (): Promise<void> => {
    console.log('loadNextPage2', readingNext.current, readAllResults.current);
    if (!readingNext.current && !readAllResults.current) {
      console.log('loadNextPage2-2', lastVisible.current?.toDate());

      try {
        readingNext.current = true;
        const newDiaries = await getDiaries(
          user.uid,
          lastVisible.current?.toDate(),
          HIT_PER_PAGE,
        );
        console.log('newDiaries', newDiaries);

        if (newDiaries.length === 0) {
          readAllResults.current = true;
          readingNext.current = false;
        } else {
          addDiaries(newDiaries);
          lastVisible.current = newDiaries[newDiaries.length - 1].createdAt;
          readingNext.current = false;
        }
      } catch (err: any) {
        readingNext.current = false;
        alert({ err });
      }
    }
  }, [user.uid, addDiaries]);

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
        });
      }
    },
    [navigation],
  );

  const onDeleteDiary = useCallback(
    async (item: Diary, index: number) => {
      if (!item.objectID) return;
      setIsLoading(true);
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

  // const onPressEdit = useCallback(() => {
  //   navigation.navigate('ModalEditMyDiaryList', { screen: 'EditMyDiaryList' });
  // }, [navigation]);

  const onPressRight = useCallback(() => {
    setMyDiaryListView(
      !localStatus.myDiaryListView || localStatus.myDiaryListView === 'list'
        ? 'calendar'
        : 'list',
    );
  }, [localStatus.myDiaryListView, setMyDiaryListView]);

  // const headerLeft = useCallback(() => {
  //   if (diaries.length > 0) {
  //     return <HeaderText text={I18n.t('common.edit')} onPress={onPressEdit} />;
  //   }
  //   return null;
  // }, [diaries.length, onPressEdit]);

  const headerRight = useCallback(
    () => (
      <HeaderIcon
        icon='community'
        name={
          !localStatus.myDiaryListView || localStatus.myDiaryListView === 'list'
            ? 'calendar'
            : 'format-list-bulleted'
        }
        onPress={onPressRight}
      />
    ),
    [localStatus.myDiaryListView, onPressRight],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerLeft,
      headerRight,
    });
  }, [headerRight, navigation]);

  return (
    <Layout disableScroll showBottomAd>
      <View style={styles.container}>
        <LoadingModal visible={isLoading} />
        {!localStatus.myDiaryListView ||
        localStatus.myDiaryListView === 'list' ? (
          <MyDiaryListFlatList
            // emptyの時のレイアウトのため
            elRefs={elRefs}
            isEmpty={!isLoading && !refreshing && diaries.length < 1}
            refreshing={refreshing}
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
      </View>
    </Layout>
  );
};

export default MyDiaryListScreen;
