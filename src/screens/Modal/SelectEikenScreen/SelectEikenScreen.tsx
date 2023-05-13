import React, { useCallback, useLayoutEffect, useMemo } from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import {
  ModalSelectDiaryTypeStackParamList,
  ModalSelectDiaryTypeStackNavigationProp,
} from '@/navigations/ModalNavigator';
import { User } from '@/types';
import SelectEikenListItem from '@/components/molecules/SelectEikenListItem';
import { EikentTitle, geEikentTitles } from './config/title';

export interface Props {
  user: User;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalSelectDiaryTypeStackParamList, 'SelectEiken'>,
  ModalSelectDiaryTypeStackNavigationProp
>;

type SelectEikenRouteProp = RouteProp<
  ModalSelectDiaryTypeStackParamList,
  'SelectEiken'
>;

type ScreenType = {
  navigation: NavigationProp;
  route: SelectEikenRouteProp;
} & Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const keyExtractor = (item: EikentTitle, index: number): string =>
  String(index);

const SelectEikenScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
}) => {
  const { themeTitle, eikenCategory } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: themeTitle,
    });
  }, [navigation, themeTitle]);

  const data = useMemo(() => {
    return geEikentTitles(eikenCategory);
  }, [eikenCategory]);

  const onPressItem = useCallback(
    (item: EikentTitle) => {
      navigation.navigate('ModalPostDiary', {
        screen: 'PostDiary',
        params: {
          themeTitle: item.title,
          themeCategory: eikenCategory,
          themeSubcategory: item.subcategory,
        },
      });
    },
    [eikenCategory, navigation],
  );

  const renderItem: ListRenderItem<EikentTitle> = useCallback(
    ({ item, index }) => {
      const newThemeDiary = user.themeDiaries?.find(
        (themeDiary) =>
          themeDiary.themeCategory === eikenCategory &&
          themeDiary.themeSubcategory === item.subcategory,
      );

      return (
        <SelectEikenListItem
          key={index}
          themeDiary={newThemeDiary}
          item={item}
          onPress={onPressItem}
        />
      );
    },
    [eikenCategory, onPressItem, user.themeDiaries],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingBottom: 32 }}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SelectEikenScreen;
