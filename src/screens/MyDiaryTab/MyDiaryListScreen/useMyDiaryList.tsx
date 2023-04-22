import { useCallback, useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import { alert } from '@/utils/ErrorAlert';
import Algolia from '@/utils/Algolia';
import { Diary, LocalStatus } from '@/types';
import { FetchInfoState } from '@/stores/reducers/diaryList';

const HIT_PER_PAGE_LIST = 20;
const HIT_PER_PAGE_CALENDAR = 20;

interface Props {
  uid: string;
  fetchInfo: FetchInfoState;
  localStatus: LocalStatus;
  setDiaries: (diaries: Diary[]) => void;
  addDiaries: (diaries: Diary[]) => void;
  setFetchInfo: (fetchInfo: FetchInfoState) => void;
  setDiaryTotalNum: (diaryTotalNum: number) => void;
  setUnreadCorrectionNum: (unreadCorrectionNum: number) => void;
}

export const useMyDiaryList = ({
  uid,
  fetchInfo,
  localStatus,
  setFetchInfo,
  setDiaries,
  addDiaries,
  setDiaryTotalNum,
}: Props) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadNextPage = useCallback(async (): Promise<void> => {
    if (!fetchInfo.readingNext && !fetchInfo.readAllResults) {
      try {
        const hitsPerPage =
          !localStatus.myDiaryListView || localStatus.myDiaryListView === 'list'
            ? HIT_PER_PAGE_LIST
            : HIT_PER_PAGE_CALENDAR;

        const nextPage = fetchInfo.page + 1;
        setFetchInfo({
          ...fetchInfo,
          readingNext: true,
        });

        const index = await Algolia.getDiaryIndex();

        const res = await index.search('', {
          filters: `uid: ${uid}`,
          page: nextPage,
          hitsPerPage,
        });
        const { hits } = res;
        if (hits.length === 0) {
          setFetchInfo({
            ...fetchInfo,
            readAllResults: true,
            readingNext: false,
          });
        } else {
          const newDiaries = hits as Diary[];
          addDiaries(newDiaries);
          setFetchInfo({
            ...fetchInfo,
            page: nextPage,
            readingNext: false,
          });
        }
      } catch (err: any) {
        setFetchInfo({
          ...fetchInfo,
          readingNext: false,
        });
        alert({ err });
      }
    }
  }, [addDiaries, fetchInfo, localStatus.myDiaryListView, setFetchInfo, uid]);

  const getNewDiary = useCallback(async (): Promise<void> => {
    try {
      const hitsPerPage =
        !localStatus.myDiaryListView || localStatus.myDiaryListView === 'list'
          ? HIT_PER_PAGE_LIST
          : HIT_PER_PAGE_CALENDAR;

      const index = await Algolia.getDiaryIndex();
      await Algolia.setSettings(index);
      const res = await index.search('', {
        filters: `uid: ${uid}`,
        page: 0,
        hitsPerPage,
      });

      const { hits, nbHits } = res;
      const newDiaries = hits as Diary[];
      setDiaries(newDiaries);
      setDiaryTotalNum(nbHits);

      // 初回取得で全て取得できた場合 true
      const readAllResults = nbHits <= hitsPerPage;

      setFetchInfo({
        page: 0,
        readingNext: false,
        readAllResults,
      });

      setIsInitialLoading(false);
    } catch (err: any) {
      setIsInitialLoading(false);
      setRefreshing(false);
      alert({ err });
    }
  }, [
    localStatus.myDiaryListView,
    setDiaries,
    setDiaryTotalNum,
    setFetchInfo,
    uid,
  ]);

  useEffect(() => {
    const f = async (): Promise<void> => {
      if (
        localStatus.myDiaryListView === 'calendar' &&
        !fetchInfo.readAllResults &&
        !fetchInfo.readingNext &&
        !isInitialLoading &&
        !refreshing
      ) {
        await loadNextPage();
      }
    };
    f();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fetchInfo.readingNext,
    localStatus.myDiaryListView,
    isInitialLoading,
    refreshing,
  ]);

  return {
    isInitialLoading,
    refreshing,
    setRefreshing,
    getNewDiary,
    loadNextPage,
  };
};
