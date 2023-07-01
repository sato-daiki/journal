import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { ListRenderItem, Dimensions } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import {
  TopicGuideIntroduction,
  TopicGuideTip,
  getEntries,
  Entry,
  TopicGuideEnd,
} from '@/components/organisms/TopicGuide';

import TopicGuideWord from '@/components/organisms/TopicGuide/TopicGuideWord';
import { mainColor, primaryColor } from '@/styles/Common';

import {
  ModalTopicGuideStackNavigationProp,
  ModalTopicGuideStackParamList,
} from '@/navigations/ModalNavigator';
import { User } from '@/types';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Layout } from '@/components/atoms';

export interface Props {
  user: User;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalTopicGuideStackParamList, 'TopicGuide'>,
  ModalTopicGuideStackNavigationProp
>;

type TopicGuideRouteProp = RouteProp<
  ModalTopicGuideStackParamList,
  'TopicGuide'
>;

export type ScreenType = {
  navigation: NavigationProp;
  route: TopicGuideRouteProp;
} & Props;

const { width } = Dimensions.get('window');

const TopicGuideScreen: React.FC<ScreenType> = ({
  navigation,
  route,
  user,
}) => {
  const { themeTitle, topicCategory, topicSubcategory, caller } = route.params;

  const entries = useMemo(() => {
    return (
      getEntries({
        topicCategory,
        topicSubcategory,
        learnLanguage: user.learnLanguage,
      }) || []
    );
  }, [topicCategory, topicSubcategory, user.learnLanguage]);

  const [activeSlide, setActiveSlide] = useState(
    caller === 'PostDiary' ? entries.length - 1 : 0,
  );
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.topicSubcategory,
    });
  }, [navigation, route.params.topicSubcategory]);

  const onPressEnd = useCallback(() => {
    // SelectTopicSubcategory選択からした場合は遷移 / PostDiaryからきた場合はback
    if (caller === 'SelectTopicSubcategory') {
      navigation.navigate('ModalPostDiary', {
        screen: 'PostDiary',
        params: {
          themeTitle: themeTitle,
          themeCategory: topicCategory,
          themeSubcategory: topicSubcategory,
        },
      });
    } else {
      navigation.goBack();
    }
  }, [caller, navigation, themeTitle, topicCategory, topicSubcategory]);

  const onSnapToItem = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const renderItem: ListRenderItem<Entry> = useCallback(
    ({ item }) => {
      switch (item.key) {
        case 'introduction':
          return <TopicGuideIntroduction params={item.params} />;
        case 'tip':
          return <TopicGuideTip params={item.params} />;
        case 'word':
          return <TopicGuideWord params={item.params} />;
        case 'end':
          return <TopicGuideEnd onPressSubmit={onPressEnd} />;
        default:
          return null;
      }
    },
    [onPressEnd],
  );

  return (
    <Layout>
      <Carousel
        data={entries}
        // @ts-ignore
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        // PostDiaryから呼ばれた場合は最後から
        firstItem={caller === 'PostDiary' ? entries.length - 1 : 0}
        onSnapToItem={onSnapToItem}
      />
      <Pagination
        activeDotIndex={activeSlide}
        dotsLength={entries.length}
        dotColor={mainColor}
        inactiveDotColor={primaryColor}
      />
    </Layout>
  );
};

export default TopicGuideScreen;
