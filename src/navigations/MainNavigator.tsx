import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CallerThemeGuide } from '@/screens/Modal/SelectThemeSubcategoryScreen/interface';
import { Diary, ThemeCategory, ThemeSubcategory } from '@/types';
import HomeBottomTabNavigator, {
  HomeBottomParamList,
} from './HomeBottomTabNavigator';

import {
  ModalEditMyDiaryListNavigator,
  ModalEditMyDiaryListStackParamList,
  ModalPostDiaryNavigator,
  ModalPostDiaryStackParamList,
  ModalPostDraftDiaryNavigator,
  ModalPostDraftDiaryStackParamList,
  ModalEditMyProfileNavigator,
  ModalEditMyProfileStackParamList,
  ModalReviewStackParamList,
  ModalAboutStackParamList,
  ModalRecordNavigator,
  ModalRecordStackParamList,
  ModalSelectDiaryTypeStackParamList,
  ModalSelectDiaryTypeNavigator,
  ModalThemeGuideStackParamList,
  ModalThemeGuideNavigator,
} from './ModalNavigator';
import { MyDiaryTabStackParamList } from './MyDiaryTabNavigator';
import { TeachDiaryTabStackParamList } from './TeachDiaryTabNavigator';
import { maxMain } from '../styles/Common';
import { RootStackParamList } from './RootNavigator';

export type MainNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

export type MainStackParamList = {
  Home: {
    screen: keyof HomeBottomParamList;
    params: {
      screen:
        | keyof MyDiaryTabStackParamList
        | keyof TeachDiaryTabStackParamList;
    };
  };
  ModalEditMyDiaryList: {
    screen: keyof ModalEditMyDiaryListStackParamList;
  };
  ModalSelectDiaryType: {
    screen: keyof ModalSelectDiaryTypeStackParamList;
  };
  ModalThemeGuide: {
    screen: keyof ModalThemeGuideStackParamList;
    params: {
      themeTitle?: string;
      themeCategory: ThemeCategory;
      themeSubcategory: ThemeSubcategory;
      caller: CallerThemeGuide;
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
  ModalEditMyProfile: { screen: keyof ModalEditMyProfileStackParamList };
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
  // NotFound: undefined;
};

const MainStack = createStackNavigator<MainStackParamList>();

const MainNavigator = () => {
  return (
    <MainStack.Navigator
      initialRouteName='Home'
      headerMode='none'
      mode='modal'
      screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF',
          marginHorizontal: 'auto',
          flex: 1,
          width: '100%',
          maxWidth: maxMain,
        },
      }}
    >
      <MainStack.Screen
        name='Home'
        component={HomeBottomTabNavigator}
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
        name='ModalThemeGuide'
        component={ModalThemeGuideNavigator}
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
        name='ModalEditMyProfile'
        component={ModalEditMyProfileNavigator}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
