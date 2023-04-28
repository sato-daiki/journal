import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import FirstPageComponents from '@/components/organisms/FirstPageComponents';
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
import { useMyDiaryList } from './useMyDiaryList';
import firestore from '@react-native-firebase/firestore';

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
  setUser: (user: User) => void;
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
    backgroundColor: '#FFF',
  },
});

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
  setUser,
  setDiaries,
  addDiaries,
  setDiaryTotalNum,
  setFetchInfo,
  setMyDiaryListView,
  navigation,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const elRefs = useRef<Swipeable[]>([]);

  const {
    isInitialLoading,
    refreshing,
    setRefreshing,
    getNewDiary,
    loadNextPage,
  } = useMyDiaryList({
    uid: user.uid,
    fetchInfo,
    localStatus,
    setFetchInfo,
    setDiaries,
    addDiaries,
    setDiaryTotalNum,
  });

  // 初期データの取得
  useEffect(() => {
    const f = async (): Promise<void> => {
      await getNewDiary();
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    await getNewDiary();
    setRefreshing(false);
  }, [getNewDiary, setRefreshing]);

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
        return;
      }

      navigation.navigate('MyDiary', {
        objectID: item.objectID,
      });
    },
    [navigation],
  );

  const onDeleteDiary = useCallback(
    async (item: Diary, index: number) => {
      if (!item.objectID) return;
      setIsLoading(true);
      await firestore().collection('diaries').doc(item.objectID).delete();
      deleteDiary(item.objectID);
      setDiaryTotalNum(diaryTotalNum - 1);
      if (elRefs.current[index]) {
        elRefs.current[index].close();
      }
      setIsLoading(false);
    },
    [deleteDiary, diaryTotalNum, setDiaryTotalNum],
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
    console.log('onPressRight', localStatus.myDiaryListView);
    setMyDiaryListView(
      !localStatus.myDiaryListView || localStatus.myDiaryListView === 'list'
        ? 'calendar'
        : 'list',
    );
  }, [localStatus.myDiaryListView, setMyDiaryListView]);

  const headerLeft = useCallback(() => {
    if (diaryTotalNum > 0) {
      return <HeaderText text={I18n.t('common.edit')} onPress={onPressEdit} />;
    }
    return null;
  }, [diaryTotalNum, onPressEdit]);

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

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft,
      headerRight,
    });
  }, [headerLeft, headerRight, navigation]);

  return (
    <Layout disableScroll showBottomAd>
      <View style={styles.container}>
        <LoadingModal visible={isLoading || isInitialLoading} />
        {!localStatus.myDiaryListView ||
        localStatus.myDiaryListView === 'list' ? (
          <MyDiaryListFlatList
            // emptyの時のレイアウトのため
            elRefs={elRefs}
            isEmpty={
              !isLoading &&
              !isInitialLoading &&
              !refreshing &&
              diaries.length < 1
            }
            refreshing={refreshing}
            diaries={diaries}
            diaryTotalNum={diaryTotalNum}
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
