import React, { useCallback } from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import {
  ModalSelectDiaryTypeStackNavigationProp,
  ModalSelectDiaryTypeStackParamList,
} from '@/navigations/ModalNavigator';
import { User } from '@/types';
import { TopicSubcategoryInfo } from './interface';
import { first } from './config/first';
import { Layout } from '@/components/templates';
import SelectTopicSubcategoryListItem from '@/components/features/SelectTopicSubcategory/SelectTopicSubcategoryListItem';

export interface Props {
  user: User;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    ModalSelectDiaryTypeStackParamList,
    'SelectTopicSubcategory'
  >,
  ModalSelectDiaryTypeStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props;

const keyExtractor = (item: TopicSubcategoryInfo, index: number): string =>
  String(index);

const SelectTopicSubcategoryScreen: React.FC<ScreenType> = ({
  navigation,
  user,
}) => {
  const onPressItem = useCallback(
    (item: TopicSubcategoryInfo) => {
      navigation.navigate('ModalTopicGuide', {
        screen: 'TopicGuide',
        params: {
          themeTitle: item.learnTitle,
          topicCategory: item.topicCategory,
          topicSubcategory: item.topicSubcategory,
          caller: 'SelectTopicSubcategory',
        },
      });
    },
    [navigation],
  );

  const renderItem: ListRenderItem<TopicSubcategoryInfo> = useCallback(
    ({ item }) => {
      // themeSubcategoryとthemeCategoryで一意になるからfindでOK
      const newThemeDiary = user.themeDiaries?.find(
        (themeDiary) =>
          themeDiary.themeCategory === item.topicCategory &&
          themeDiary.themeSubcategory === item.topicSubcategory,
      );
      return (
        <SelectTopicSubcategoryListItem
          key={item.topicSubcategory}
          themeDiary={newThemeDiary}
          item={item}
          onPress={onPressItem}
        />
      );
    },
    [onPressItem, user.themeDiaries],
  );

  return (
    <Layout>
      <FlatList
        data={first({
          learnLanguage: user.learnLanguage,
        })}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </Layout>
  );
};

export default SelectTopicSubcategoryScreen;
