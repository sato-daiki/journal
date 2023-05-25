import React, { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Diary, LocalStatus } from '@/types';
import MyDiary from '@/components/organisms/MyDiary/MyDiary';
import {
  ModalViewMyDiaryStackNavigationProp,
  ModalViewMyDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { HeaderText } from '@/components/atoms';
import I18n from '@/utils/I18n';

export interface Props {
  diary?: Diary;
  localStatus: LocalStatus;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
}

export type ViewMyDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalViewMyDiaryStackParamList, 'ViewMyDiary'>,
  ModalViewMyDiaryStackNavigationProp
>;

type ScreenType = {
  navigation: ViewMyDiaryNavigationProp;
} & Props &
  DispatchProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const ViewMyDiaryScreen: React.FC<ScreenType> = ({
  navigation,
  diary,
  localStatus,
  editDiary,
}) => {
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: I18n.t('viewMyDiary.headerTitle'),
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
    });
  }, [diary, navigation, onPressClose]);

  if (!diary) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MyDiary
        isView
        navigation={navigation}
        diary={diary}
        isPremium={localStatus.isPremium}
        editDiary={editDiary}
      />
    </View>
  );
};
export default ViewMyDiaryScreen;
