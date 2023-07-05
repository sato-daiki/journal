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
import { getDefaultScreenOptions } from '../styles/navigationOptions';
import {
  HomeBottomParamList,
  HomeBottomNavigationProp,
} from './HomeBottomTabNavigator';
import { useAppTheme } from '@/styles/colors';

export type MyDiaryTabNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeBottomParamList, 'MyDiaryTab'>,
  HomeBottomNavigationProp
>;

export type MyDiaryCaller =
  | 'MyDiaryList'
  | 'PostReviseDiary'
  | 'PostDraftDiary'
  | 'PostDiary';

export type MyDiaryTabStackParamList = {
  MyDiaryList: undefined;
  MyDiary: {
    objectID: string;
    caller: MyDiaryCaller;
  };
};

const MyDiaryTabStack = createStackNavigator<MyDiaryTabStackParamList>();

const MyDiaryTabNavigator = () => {
  const theme = useAppTheme();
  const DefaultScreenOptions = getDefaultScreenOptions(theme);
  return (
    <MyDiaryTabStack.Navigator
      initialRouteName='MyDiaryList'
      screenOptions={DefaultScreenOptions}
    >
      <MyDiaryTabStack.Screen
        name='MyDiaryList'
        component={MyDiaryListScreenContainer}
        options={{
          title: I18n.t('myDiaryList.headerTitle'),
        }}
      />
      <MyDiaryTabStack.Screen
        name='MyDiary'
        // @ts-ignore
        component={MyDiaryScreenContainer}
      />
    </MyDiaryTabStack.Navigator>
  );
};

export default MyDiaryTabNavigator;
