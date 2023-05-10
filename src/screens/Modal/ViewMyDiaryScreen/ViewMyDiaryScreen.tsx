import React, { useCallback, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { Diary } from '@/types';
import MyDiary from '@/components/organisms/MyDiary/MyDiary';
import {
  ModalViewMyDiaryStackNavigationProp,
  ModalViewMyDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { HeaderText } from '@/components/atoms';
import I18n from '@/utils/I18n';

export interface Props {
  diary?: Diary;
}

interface DispatchProps {
  editDiary: (objectID: string, diary: Diary) => void;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalViewMyDiaryStackParamList, 'ViewMyDiary'>,
  ModalViewMyDiaryStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
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
  editDiary,
}) => {
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: diary ? diary.title : '',
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
      <MyDiary diary={diary} editDiary={editDiary} />
    </View>
  );
};
export default ViewMyDiaryScreen;
