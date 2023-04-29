import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { SelectThemeSubcategoryListItem } from '@/components/molecules';

import {
  ModalSelectDiaryTypeStackNavigationProp,
  ModalSelectDiaryTypeStackParamList,
} from '@/navigations/ModalNavigator';
import { User } from '@/types';
import { ThemeSubcategoryInfo } from './interface';
import { first } from './config/first';

export interface Props {
  user: User;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    ModalSelectDiaryTypeStackParamList,
    'SelectThemeSubcategory'
  >,
  ModalSelectDiaryTypeStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props;
const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const keyExtractor = (item: ThemeSubcategoryInfo, index: number): string =>
  String(index);

const SelectThemeSubcategoryScreen: React.FC<ScreenType> = ({
  navigation,
  user,
}) => {
  const onPressItem = useCallback(
    (item: ThemeSubcategoryInfo) => {
      navigation.navigate('ModalThemeGuide', {
        screen: 'ThemeGuide',
        params: {
          themeTitle: item.learnTitle,
          themeCategory: item.themeCategory,
          themeSubcategory: item.themeSubcategory,
          caller: 'SelectThemeSubcategory',
        },
      });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<ThemeSubcategoryInfo> = useCallback(
    ({ item }) => {
      // themeSubcategoryとthemeCategoryで一意になるからfindでOK
      const newThemeDiary = user.themeDiaries?.find(
        (themeDiary) =>
          themeDiary.themeCategory === item.themeCategory &&
          themeDiary.themeSubcategory === item.themeSubcategory,
      );
      return (
        <SelectThemeSubcategoryListItem
          key={item.themeSubcategory}
          themeDiary={newThemeDiary}
          item={item}
          onPress={onPressItem}
        />
      );
    },
    [onPressItem, user.themeDiaries],
  );

  return (
    <View style={styles.contaner}>
      <FlatList
        data={first({
          learnLanguage: user.learnLanguage,
        })}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SelectThemeSubcategoryScreen;
