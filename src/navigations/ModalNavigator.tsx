import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import { getDefaultScreenOptions } from '@/styles/navigationOptions';
import I18n from '@/utils/I18n';
import {
  Diary,
  EikenCategory,
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
import { useAppTheme } from '@/styles/colors';

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
const ModalEditMyProfileStack =
  createStackNavigator<ModalEditMyProfileStackParamList>();
const ModalBecomePremiumStack =
  createStackNavigator<ModalBecomePremiumStackParamList>();
const ModalRecordStack = createStackNavigator<ModalRecordStackParamList>();

export const ModalEditMyDiaryListNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalEditMyDiaryListStack.Navigator
      initialRouteName='EditMyDiaryList'
      screenOptions={DefaultScreenOptions}
    >
      <ModalEditMyDiaryListStack.Screen
        name='EditMyDiaryList'
        component={EditMyDiaryListScreenContainer}
        options={{
          title: I18n.t('editMyDiaryList.headerTitle'),
        }}
      />
    </ModalEditMyDiaryListStack.Navigator>
  );
};
export const ModalSelectDiaryTypeNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalSelectDiaryTypeStack.Navigator
      initialRouteName='SelectDiaryType'
      screenOptions={DefaultScreenOptions}
    >
      <ModalSelectDiaryTypeStack.Screen
        name='SelectDiaryType'
        component={SelectDiaryTypeScreen}
        options={{
          title: I18n.t('selectDiaryType.headerTitle'),
        }}
      />
      <ModalSelectDiaryTypeStack.Screen
        name='SelectTopicSubcategory'
        component={SelectTopicSubcategoryScreenContainer}
        options={{
          title: I18n.t('selectTopicSubcategory.headerTitle'),
        }}
      />
      <ModalSelectDiaryTypeStack.Screen
        name='SelectEiken'
        component={SelectEikenScreenContainer}
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
      />
    </ModalTopicGuideStack.Navigator>
  );
};
export const ModalPostDiaryNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalPostDiaryStack.Navigator
      initialRouteName='PostDiary'
      screenOptions={DefaultScreenOptions}
    >
      <ModalPostDiaryStack.Screen
        name='PostDiary'
        // @ts-ignore
        component={PostDiaryScreenContainer}
        options={{
          title: I18n.t('postDiary.headerTitle'),
        }}
      />
    </ModalPostDiaryStack.Navigator>
  );
};
export const ModalPostDraftDiaryNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalPostDraftDiaryStack.Navigator
      initialRouteName='PostDraftDiary'
      screenOptions={DefaultScreenOptions}
    >
      <ModalPostDraftDiaryStack.Screen
        name='PostDraftDiary'
        component={PostDraftDiaryScreenContainer}
        options={{
          title: I18n.t('postDraftDiary.headerTitle'),
        }}
      />
    </ModalPostDraftDiaryStack.Navigator>
  );
};
export const ModalPostReviseDiaryNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalPostReviseDiaryStack.Navigator
      initialRouteName='PostReviseDiary'
      screenOptions={DefaultScreenOptions}
    >
      <ModalPostReviseDiaryStack.Screen
        name='PostReviseDiary'
        component={PostReviseDiaryScreenContainer}
        options={{
          title: I18n.t('postReviseDiary.headerTitle'),
        }}
      />
    </ModalPostReviseDiaryStack.Navigator>
  );
};
export const ModalViewMyDiaryNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalViewMyDiaryStack.Navigator
      initialRouteName='ViewMyDiary'
      screenOptions={DefaultScreenOptions}
    >
      <ModalViewMyDiaryStack.Screen
        name='ViewMyDiary'
        component={ViewMyDiaryScreenContainer}
      />
    </ModalViewMyDiaryStack.Navigator>
  );
};
export const ModalEditMyProfileNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalEditMyProfileStack.Navigator
      initialRouteName='EditMyProfile'
      screenOptions={DefaultScreenOptions}
    >
      <ModalEditMyProfileStack.Screen
        name='EditMyProfile'
        component={EditMyProfileScreenContainer}
        options={{
          title: I18n.t('editMyProfile.headerTitle'),
        }}
      />
    </ModalEditMyProfileStack.Navigator>
  );
};
export const ModalBecomePremiumeNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalBecomePremiumStack.Navigator
      initialRouteName='BecomePremium'
      screenOptions={DefaultScreenOptions}
    >
      <ModalBecomePremiumStack.Screen
        name='BecomePremium'
        component={BecomePremiumScreenContainer}
        options={{
          title: I18n.t('becomePremium.headerTitle'),
        }}
      />
    </ModalBecomePremiumStack.Navigator>
  );
};

export const ModalRecordNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <ModalRecordStack.Navigator
      initialRouteName='Record'
      screenOptions={DefaultScreenOptions}
    >
      <ModalRecordStack.Screen
        name='Record'
        component={RecordScreenContainer}
        options={{
          title: I18n.t('record.headerTitle'),
        }}
      />
    </ModalRecordStack.Navigator>
  );
};
