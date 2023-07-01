import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CallerTopicGuide } from '@/screens/Modal/SelectTopicSubcategoryScreen/interface';
import {
  Diary,
  ThemeCategory,
  ThemeSubcategory,
  TopicCategory,
  TopicSubcategory,
} from '@/types';
import { HomeBottomParamList } from './HomeBottomTabNavigator';
import HomeBottomTabNavigatorContainer from '@/containers/HomeBottomTabNavigatorContainer';

import {
  ModalEditMyDiaryListNavigator,
  ModalEditMyDiaryListStackParamList,
  ModalPostDiaryNavigator,
  ModalPostDiaryStackParamList,
  ModalPostDraftDiaryNavigator,
  ModalPostDraftDiaryStackParamList,
  ModalPostReviseDiaryNavigator,
  ModalPostReviseDiaryStackParamList,
  ModalViewMyDiaryStackParamList,
  ModalViewMyDiaryNavigator,
  ModalEditMyProfileNavigator,
  ModalEditMyProfileStackParamList,
  ModalReviewStackParamList,
  ModalRecordNavigator,
  ModalRecordStackParamList,
  ModalSelectDiaryTypeStackParamList,
  ModalSelectDiaryTypeNavigator,
  ModalTopicGuideStackParamList,
  ModalTopicGuideNavigator,
  ModalBecomePremiumStackParamList,
  ModalBecomePremiumeNavigator,
} from './ModalNavigator';
import { MyDiaryTabStackParamList } from './MyDiaryTabNavigator';
import { RootStackParamList } from './RootNavigator';

export type MainNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

export type MainStackParamList = {
  Home: {
    screen: keyof HomeBottomParamList;
    params: {
      screen: keyof MyDiaryTabStackParamList;
    };
  };
  ModalEditMyDiaryList: {
    screen: keyof ModalEditMyDiaryListStackParamList;
  };
  ModalSelectDiaryType: {
    screen: keyof ModalSelectDiaryTypeStackParamList;
  };
  ModalTopicGuide: {
    screen: keyof ModalTopicGuideStackParamList;
    params: {
      themeTitle?: string;
      topicCategory: TopicCategory;
      topicSubcategory: TopicSubcategory;
      caller: CallerTopicGuide;
    };
  };
  ModalPostDiary: {
    screen: keyof ModalPostDiaryStackParamList;
    params?: {
      themeTitle?: string;
      themeCategory?: ThemeCategory;
      themeSubcategory?: ThemeSubcategory;
    };
  };
  ModalPostDraftDiary: {
    screen: keyof ModalPostDraftDiaryStackParamList;
    params: {
      item: Diary;
      objectID: string;
    };
  };
  ModalPostReviseDiary: {
    screen: keyof ModalPostReviseDiaryStackParamList;
    params: {
      item: Diary;
      objectID: string;
    };
  };
  ModalViewMyDiary: {
    screen: keyof ModalViewMyDiaryStackParamList;
    params: {
      objectID: string;
    };
  };
  ModalEditMyProfile: { screen: keyof ModalEditMyProfileStackParamList };
  ModalBecomePremium: { screen: keyof ModalBecomePremiumStackParamList };
  ModalReview: {
    screen: keyof ModalReviewStackParamList;
    params: {
      objectID: string;
      correctedNum: number;
      userName: string;
    };
  };
  ModalRecord: {
    screen: keyof ModalRecordStackParamList;
    params: { objectID: string };
  };
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        presentation: 'modal',
      }}
    >
      <MainStack.Screen
        name='Home'
        component={HomeBottomTabNavigatorContainer}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name='ModalEditMyDiaryList'
        component={ModalEditMyDiaryListNavigator}
      />
      <MainStack.Screen name='ModalRecord' component={ModalRecordNavigator} />

      <MainStack.Screen
        name='ModalTopicGuide'
        component={ModalTopicGuideNavigator}
      />
      <MainStack.Screen
        name='ModalSelectDiaryType'
        component={ModalSelectDiaryTypeNavigator}
      />
      <MainStack.Screen
        name='ModalPostDiary'
        component={ModalPostDiaryNavigator}
      />
      <MainStack.Screen
        name='ModalPostDraftDiary'
        component={ModalPostDraftDiaryNavigator}
      />
      <MainStack.Screen
        name='ModalPostReviseDiary'
        component={ModalPostReviseDiaryNavigator}
      />
      <MainStack.Screen
        name='ModalViewMyDiary'
        component={ModalViewMyDiaryNavigator}
      />
      <MainStack.Screen
        name='ModalEditMyProfile'
        component={ModalEditMyProfileNavigator}
      />
      <MainStack.Screen
        name='ModalBecomePremium'
        component={ModalBecomePremiumeNavigator}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
