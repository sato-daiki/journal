import React, { useLayoutEffect, useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ListRenderItem,
  SafeAreaView,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import {
  HeaderText,
  LoadingModal,
  SmallButtonSubmit,
} from '@/components/atoms';
import I18n from '@/utils/I18n';
import { User, Diary } from '@/types';
import {
  ModalEditMyDiaryListStackNavigationProp,
  ModalEditMyDiaryListStackParamList,
} from '@/navigations/ModalNavigator';
import { FetchInfoState } from '@/stores/reducers/diaryList';
import EditMyDiaryListItem from '@/components/organisms/EditMyDiaryListItem';
import { borderLightColor, fontSizeS, softRed } from '@/styles/Common';
import ModalConfirm from '@/components/organisms/ModalConfirm';
import firestore from '@react-native-firebase/firestore';
import { getLoadNextPage } from '@/utils/diary';

export interface Props {
  user: User;
  diaries: Diary[];
  fetchInfo: FetchInfoState;
}

interface DispatchProps {
  addDiaries: (diaries: Diary[]) => void;
  deleteDiary: (objectId: string) => void;
  setFetchInfo: (fetchInfo: FetchInfoState) => void;
}

type EditMyDiaryListNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalEditMyDiaryListStackParamList, 'EditMyDiaryList'>,
  ModalEditMyDiaryListStackNavigationProp
>;

type ScreenType = {
  navigation: EditMyDiaryListNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom: 16,
  },
  disableTitileText: {
    fontSize: fontSizeS,
    color: borderLightColor,
  },
});

const HIT_PER_PAGE = 20;

const keyExtractor = (item: Diary, index: number): string => String(index);

const EditMyDiaryListScreen: React.FC<ScreenType> = ({
  user,
  diaries,
  fetchInfo,
  addDiaries,
  deleteDiary,
  setFetchInfo,
  navigation,
}) => {
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkedIdsLength, setCheckedIdsLength] = useState(0);
  const checkedIds = useRef<string[]>([]);

  const loadNextPage = useCallback(async (): Promise<void> => {
    getLoadNextPage(fetchInfo, setFetchInfo, user.uid, addDiaries);
  }, [addDiaries, fetchInfo, setFetchInfo, user.uid]);

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
    });
  }, [navigation, onPressClose]);

  const onDeleteDiaries = useCallback(async () => {
    if (checkedIds.current.length === 0) return;
    setIsLoading(true);

    checkedIds.current.forEach(async (id) => {
      await firestore().collection('diaries').doc(id).delete();
    });
    setIsLoading(false);

    checkedIds.current.forEach((id) => {
      deleteDiary(id);
    });
    navigation.goBack();
  }, [deleteDiary, navigation]);

  const handlePress = useCallback((objectID: string) => {
    const res = checkedIds.current.includes(objectID);
    if (res) {
      const newCheckedIds = checkedIds.current.filter((id) => id !== objectID);
      checkedIds.current = newCheckedIds;
    } else {
      checkedIds.current = [...checkedIds.current, objectID];
    }
    setCheckedIdsLength(checkedIds.current.length);
  }, []);

  const handleOpenModalDelete = useCallback(() => {
    setIsModalDelete(true);
  }, []);

  const handleCloseModalDelete = useCallback(() => {
    setIsModalDelete(false);
  }, []);

  const renderItem: ListRenderItem<Diary> = useCallback(
    ({ item }) => {
      return <EditMyDiaryListItem item={item} handlePress={handlePress} />;
    },
    [handlePress],
  );

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <LoadingModal visible={isLoading} />
        <ModalConfirm
          visible={isModalDelete}
          isLoading={isLoading}
          title={I18n.t('common.confirmation')}
          message={I18n.t('myDiary.confirmMessage')}
          mainButtonText='OK'
          onPressMain={onDeleteDiaries}
          onPressClose={handleCloseModalDelete}
        />
        <FlatList
          data={diaries}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={loadNextPage}
        />
        <View style={styles.buttonContainer}>
          <SmallButtonSubmit
            titleStyle={
              checkedIdsLength === 0 ? styles.disableTitileText : undefined
            }
            disable={checkedIdsLength === 0}
            title={`${I18n.t('common.delete')}${
              checkedIdsLength === 0 ? '' : `(${checkedIds.current.length})`
            }`}
            onPress={handleOpenModalDelete}
            backgroundColor={softRed}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditMyDiaryListScreen;
