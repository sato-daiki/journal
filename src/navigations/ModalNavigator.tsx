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
import { Diary, ThemeCategory, ThemeSubcategory } from '@/types';

/* screens */
import PostDiaryScreenContainer from '@/containers/PostDiaryScreenContainer';
import EditMyProfileScreenContainer from '@/containers/EditMyProfileScreenContainer';
import PostDraftDiaryScreenContainer from '@/containers/PostDraftDiaryScreenContainer';
import RecordScreenContainer from '@/containers/RecordScreenContainer';
import EditMyDiaryListScreenContainer from '@/containers/EditMyDiaryListScreenContainer';
import SelectThemeSubcategoryScreenContainer from '@/containers/SelectThemeSubcategoryScreenContainer';
import { CallerThemeGuide } from '@/screens/Modal/SelectThemeSubcategoryScreen/interface';
import ThemeGuideScreenContainer from '@/containers/ThemeGuideScreenContainer';
import { MainStackParamList } from './MainNavigator';
import SelectDiaryTypeScreen from '@/screens/Modal/SelectDiaryTypeScreen';

export type ModalEditMyDiaryListStackParamList = {
  EditMyDiaryList: undefined;
};
export type ModalThemeGuideStackParamList = {
  ThemeGuide: {
    themeTitle: string;
    themeCategory: ThemeCategory;
    themeSubcategory: ThemeSubcategory;
    caller: CallerThemeGuide;
  };
};
export type ModalSelectDiaryTypeStackParamList = {
  SelectDiaryType: undefined;
  // SelectCategory: undefined; // 大カテゴリー
  SelectThemeSubcategory: undefined; // 小カテゴリー
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
export type ModalEditMyProfileStackParamList = {
  EditMyProfile: undefined;
  EditUserName: { userName: string; setUserName: (text: string) => void };
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
export type ModalAboutStackParamList = {
  About: undefined;
};

export type ModalEditMyDiaryListStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalEditMyDiaryList'
>;
export type ModalSelectDiaryTypeStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalSelectDiaryType'
>;
export type ModalThemeGuideStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalThemeGuide'
>;
export type ModalPostDiaryStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostDiary'
>;
export type ModalPostDraftDiaryStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalPostDraftDiary'
>;
export type ModalEditMyProfileStackNavigationProp = StackNavigationProp<
  MainStackParamList,
  'ModalEditMyProfile'
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
const ModalThemeGuideStack =
  createStackNavigator<ModalThemeGuideStackParamList>();
const ModalPostDiaryStack =
  createStackNavigator<ModalPostDiaryStackParamList>();
const ModalPostDraftDiaryStack =
  createStackNavigator<ModalPostDraftDiaryStackParamList>();
const ModalEditMyProfileStack =
  createStackNavigator<ModalEditMyProfileStackParamList>();
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
        name='SelectThemeSubcategory'
        component={SelectThemeSubcategoryScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
          title: I18n.t('selectThemeSubcategory.headerTitle'),
        }}
      />
    </ModalSelectDiaryTypeStack.Navigator>
  );
};
export const ModalThemeGuideNavigator = () => {
  return (
    <ModalThemeGuideStack.Navigator
      initialRouteName='ThemeGuide'
      screenOptions={{ headerShown: false }}
    >
      <ModalThemeGuideStack.Screen
        name='ThemeGuide'
        component={ThemeGuideScreenContainer}
        options={{
          ...DefaultNavigationOptions,
          ...DefaultModalLayoutOptions,
        }}
      />
    </ModalThemeGuideStack.Navigator>
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
