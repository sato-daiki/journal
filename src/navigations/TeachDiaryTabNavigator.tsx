import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import I18n from '../utils/I18n';

/* screens */
import TeachDiaryListScreenContainer from '../containers/TeachDiaryListScreenContainer';
import TeachDiaryScreenContainer from '../containers/TeachDiaryScreenContainer';
import TeachDiarySearchScreenContainer from '../containers/TeachDiarySearchScreenContainer';
import { DefaultNavigationOptions, DefaultSearchBarOptions } from '../constants/NavigationOptions';
import { CommonStackParamList, createCommonNavigator } from './CommonNavigator';
import { HomeBottomParamList, HomeBottomNavigationProp } from './HomeBottomTabNavigator';

export type TeachDiaryTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'TeachDiaryTab'>,
  HomeBottomNavigationProp
>;

export type TeachDiaryTabStackParamList = {
  TeachDiaryList: undefined;
  TeachDiarySearch: undefined;
  TeachDiary: { objectID: string; userName: string };
  Common: undefined;
} & CommonStackParamList;

const TeachDiaryTabStack = createStackNavigator<TeachDiaryTabStackParamList>();

const TeachDiaryTabNavigator = () => {
  return (
    <TeachDiaryTabStack.Navigator
      initialRouteName='TeachDiaryList'
      screenOptions={DefaultNavigationOptions}
    >
      <TeachDiaryTabStack.Screen
        name='TeachDiaryList'
        component={TeachDiaryListScreenContainer}
        options={{
          ...DefaultSearchBarOptions,
          title: I18n.t('teachDiaryList.headerTitle'),
        }}
      />
      <TeachDiaryTabStack.Screen
        name='TeachDiarySearch'
        component={TeachDiarySearchScreenContainer}
        options={{
          headerShown: false,
          title: I18n.t('teachDiaryList.searchText'),
        }}
      />
      <TeachDiaryTabStack.Screen name='TeachDiary' component={TeachDiaryScreenContainer} />
      {createCommonNavigator()}
    </TeachDiaryTabStack.Navigator>
  );
};

export default TeachDiaryTabNavigator;
