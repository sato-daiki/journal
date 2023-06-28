import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import {
  DefaultNavigationOptions,
  DefaultModalLayoutOptions,
} from '@/constants/NavigationOptions';
import I18n from '@/utils/I18n';
import {
  Diary,
  EikenCategory,
  ImageInfo,
  ThemeCategory,
  ThemeSubcategory,
  TopicCategory,
  TopicSubcategory,
} from '@/types';

/* screens */
import PostDiaryScreenContainer from '@/containers/PostDiaryScreenContainer';
import EditMyProfileScreenContainer from '@/containers/EditMyProfileScreenContainer';
import PostDraftDiaryScreenContainer from '@/containers/PostDraftDiaryScreenContainer';
import PostReviseDiaryScreenContainer from '@/containers/PostReviseDiaryScreenContainer';
import RecordScreenContainer from '@/containers/RecordScreenContainer';
import EditMyDiaryListScreenContainer from '@/containers/EditMyDiaryListScreenContainer';
import SelectTopicSubcategoryScreenContainer from '@/containers/SelectTopicSubcategoryScreenContainer';
import { CallerTopicGuide } from '@/screens/Modal/SelectTopicSubcategoryScreen/interface';
import { MainStackParamList } from './MainNavigator';
import SelectDiaryTypeScreen from '@/screens/Modal/SelectDiaryTypeScreen';
import SelectEikenScreenContainer from '@/containers/SelectEikenScreenContainer';
import TopicGuideScreenContainer from '@/containers/TopicGuideScreenContainer';
import ViewMyDiaryScreenContainer from '@/containers/ViewMyDiaryScreenContainer';
import BecomePremiumScreenContainer from '@/containers/BecomePremiumScreenContainer';
import ImageListScreen from '@/screens/Modal/ImageListScreen';

export type ModalEditMyDiaryListStackParamList = {
  EditMyDiaryList: undefined;
};
export type ModalTopicGuideStackParamList = {
  TopicGuide: {
    themeTitle: string;
    topicCategory: TopicCategory;
    topicSubcategory: TopicSubcategory;
    caller: CallerTopicGuide;
  };
};
export type ModalSelectDiaryTypeStackParamList = {
  SelectDiaryType: undefined;
  SelectTopicSubcategory: undefined;
  SelectEiken: {
    themeTitle: string;
    eikenCategory: EikenCategory;
  };
};
export type ModalPostDiaryStackParamList = {
  PostDiary: {
    themeTitle?: string;
    themeCategory?: ThemeCategory;
    themeSubcategory?: ThemeSubcategory;
  };
};
export type ModalPostDraftDiaryStackParamList = {
  PostDraftDiary: {
    item: Diary;
    objectID: string;
  };
};
export type ModalPostReviseDiaryStackParamList = {
  PostReviseDiary: {
    item: Diary;
    objectID: string;
  };
};
export type ModalViewMyDiaryStackParamList = {
  ViewMyDiary: {
    objectID: string;
  };
};
export type ModalImageListStackParamList = {
  ImageList: {
    defaultIndex: number;
    images: ImageInfo[];
  };
};
export type ModalEditMyProfileStackParamList = {
  EditMyProfile: undefined;
  EditUserName: { userName: string; setUserName: (text: string) => void };
};
export type ModalBecomePremiumStackParamList = {
  BecomePremium: undefined;
};
export type ModalReviewStackParamList = {
  Review: {
    objectID: string;
    correctedNum: number;
    userName: string;
  };
};
export type ModalCorrectingStackParamList = {
  Correcting: { objectID: string; userName: string };
};
export type ModalRecordStackParamList = {
  Record: { objectID: string };
};

export type ModalEditMyDiaryListStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalEditMyDiaryList'
>;
export type ModalSelectDiaryTypeStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalSelectDiaryType'
>;
export type ModalTopicGuideStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalTopicGuide'
>;
export type ModalPostDiaryStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostDiary'
>;
export type ModalPostDraftDiaryStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostDraftDiary'
>;
export type ModalPostReviseDiaryStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostReviseDiary'
>;
export type ModalViewMyDiaryStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalViewMyDiary'
>;
export type ModalImageListStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalImageList'
>;
export type ModalEditMyProfileStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalEditMyProfile'
>;
export type ModalBecomePremiumStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalBecomePremium'
>;
export type ModalReviewStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalReview'
>;
export type ModaRecordStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalRecord'
>;

const ModalEditMyDiaryListStack =
  createStackNavigator<ModalEditMyDiaryListStackParamList>();
const ModalSelectDiaryTypeStack =
  createStackNavigator<ModalSelectDiaryTypeStackParamList>();
const ModalTopicGuideStack =
  createStackNavigator<ModalTopicGuideStackParamList>();
const ModalPostDiaryStack =
  createStackNavigator<ModalPostDiaryStackParamList>();
const ModalPostDraftDiaryStack =
  createStackNavigator<ModalPostDraftDiaryStackParamList>();
const ModalPostReviseDiaryStack =
  createStackNavigator<ModalPostReviseDiaryStackParamList>();
const ModalViewMyDiaryStack =
  createStackNavigator<ModalViewMyDiaryStackParamList>();
const ModalImageListStack =
  createStackNavigator<ModalImageListStackParamList>();
const ModalEditMyProfileStack =
  createStackNavigator<ModalEditMyProfileStackParamList>();
const ModalBecomePremiumStack =
  createStackNavigator<ModalBecomePremiumStackParamList>();
const ModalRecordStack = createStackNavigator<ModalRecordStackParamList>();

export const ModalEditMyDiaryListNavigator = () => {
  return (
    <ModalEditMyDiaryListStack.Navigator initialRouteName='EditMyDiaryList'>
      <ModalEditMyDiaryListStack.Screen
        name='EditMyDiaryList'
        component={EditMyDiaryListScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('editMyDiaryList.headerTitle'),
        }}
      />
    </ModalEditMyDiaryListStack.Navigator>
  );
};
export const ModalSelectDiaryTypeNavigator = () => {
  return (
    <ModalSelectDiaryTypeStack.Navigator initialRouteName='SelectDiaryType'>
      <ModalSelectDiaryTypeStack.Screen
        name='SelectDiaryType'
        component={SelectDiaryTypeScreen}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('selectDiaryType.headerTitle'),
        }}
      />
      <ModalSelectDiaryTypeStack.Screen
        name='SelectTopicSubcategory'
        component={SelectTopicSubcategoryScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('selectTopicSubcategory.headerTitle'),
        }}
      />
      <ModalSelectDiaryTypeStack.Screen
        name='SelectEiken'
        component={SelectEikenScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
        }}
      />
    </ModalSelectDiaryTypeStack.Navigator>
  );
};
export const ModalTopicGuideNavigator = () => {
  return (
    <ModalTopicGuideStack.Navigator
      initialRouteName='TopicGuide'
      screenOptions={{ headerShown: false }}
    >
      <ModalTopicGuideStack.Screen
        name='TopicGuide'
        component={TopicGuideScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
        }}
      />
    </ModalTopicGuideStack.Navigator>
  );
};
export const ModalPostDiaryNavigator = () => {
  return (
    <ModalPostDiaryStack.Navigator initialRouteName='PostDiary'>
      <ModalPostDiaryStack.Screen
        name='PostDiary'
        // @ts-ignore
        component={PostDiaryScreenContainer}
      />
    </ModalPostDiaryStack.Navigator>
  );
};
export const ModalPostDraftDiaryNavigator = () => {
  return (
    <ModalPostDraftDiaryStack.Navigator initialRouteName='PostDraftDiary'>
      <ModalPostDraftDiaryStack.Screen
        name='PostDraftDiary'
        component={PostDraftDiaryScreenContainer}
        // optionはweb/nativeで違うのでscreen側で設定する
      />
    </ModalPostDraftDiaryStack.Navigator>
  );
};
export const ModalPostReviseDiaryNavigator = () => {
  return (
    <ModalPostReviseDiaryStack.Navigator initialRouteName='PostReviseDiary'>
      <ModalPostReviseDiaryStack.Screen
        name='PostReviseDiary'
        component={PostReviseDiaryScreenContainer}
      />
    </ModalPostReviseDiaryStack.Navigator>
  );
};
export const ModalViewMyDiaryNavigator = () => {
  return (
    <ModalViewMyDiaryStack.Navigator initialRouteName='ViewMyDiary'>
      <ModalViewMyDiaryStack.Screen
        name='ViewMyDiary'
        component={ViewMyDiaryScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
        }}
      />
    </ModalViewMyDiaryStack.Navigator>
  );
};
export const ModalImageListNavigator = () => {
  return (
    <ModalImageListStack.Navigator
      initialRouteName='ImageList'
      screenOptions={{ presentation: 'modal' }}
    >
      <ModalImageListStack.Screen
        name='ImageList'
        component={ImageListScreen}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
        }}
      />
    </ModalImageListStack.Navigator>
  );
};
export const ModalEditMyProfileNavigator = () => {
  return (
    <ModalEditMyProfileStack.Navigator initialRouteName='EditMyProfile'>
      <ModalEditMyProfileStack.Screen
        name='EditMyProfile'
        component={EditMyProfileScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('editMyProfile.headerTitle'),
        }}
      />
    </ModalEditMyProfileStack.Navigator>
  );
};
export const ModalBecomePremiumeNavigator = () => {
  return (
    <ModalBecomePremiumStack.Navigator initialRouteName='BecomePremium'>
      <ModalBecomePremiumStack.Screen
        name='BecomePremium'
        component={BecomePremiumScreenContainer}
      />
    </ModalBecomePremiumStack.Navigator>
  );
};

export const ModalRecordNavigator = () => {
  return (
    <ModalRecordStack.Navigator initialRouteName='Record'>
      <ModalRecordStack.Screen
        name='Record'
        component={RecordScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('record.headerTitle'),
        }}
      />
    </ModalRecordStack.Navigator>
  );
};
