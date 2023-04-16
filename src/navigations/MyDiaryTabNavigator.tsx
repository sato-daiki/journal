import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import I18n from '../utils/I18n';

/* screens */
import MyDiaryListScreenContainer from '../containers/MyDiaryListScreenContainer';
import MyDiaryScreenContainer from '../containers/MyDiaryScreenContainer';
import {
  DefaultNavigationOptions,
  DefaultSearchBarOptions,
} from '../constants/NavigationOptions';
import { CommonStackParamList } from './CommonNavigator';
import {
  HomeBottomParamList,
  HomeBottomNavigationProp,
} from './HomeBottomTabNavigator';
import WebViewScreen from '../screens/WebViewScreen';

export type MyDiaryTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'MyDiaryTab'>,
  HomeBottomNavigationProp
>;

export type MyDiaryTabStackParamList = {
  MyDiaryList: undefined;
  MyDiary: { objectID: string };
  RecommendedMethod: { url: string };
} & CommonStackParamList;

const MyDiaryTabStack = createStackNavigator<MyDiaryTabStackParamList>();

const MyDiaryTabNavigator = () => {
  return (
    <MyDiaryTabStack.Navigator
      initialRouteName='MyDiaryList'
      screenOptions={DefaultNavigationOptions}
    >
      <MyDiaryTabStack.Screen
        name='MyDiaryList'
        component={MyDiaryListScreenContainer}
        options={{
          ...DefaultSearchBarOptions,
          title: I18n.t('myDiaryList.headerTitle'),
        }}
      />
      <MyDiaryTabStack.Screen
        name='MyDiary'
        component={MyDiaryScreenContainer}
      />
      <MyDiaryTabStack.Screen
        name='RecommendedMethod'
        component={WebViewScreen}
        options={{ title: I18n.t('myDiary.recommend') }}
      />
    </MyDiaryTabStack.Navigator>
  );
};

export default MyDiaryTabNavigator;
