import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import I18n from '../utils/I18n';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import MyDiaryTabNavigator, {
  MyDiaryTabStackParamList,
} from './MyDiaryTabNavigator';
import MyPageTabNavigator, {
  MyPageTabStackParamList,
} from './MyPageTabNavigator';
import { MainStackParamList, MainNavigationProp } from './MainNavigator';
import { mainColor, subTextColor } from '@/styles/Common';

export type HomeBottomNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Home'>,
  MainNavigationProp
>;

export type HomeBottomParamList = {
  MyDiaryTab: { screen: keyof MyDiaryTabStackParamList };
  PostDiaryTab: undefined;
  MyPageTab: { screen: keyof MyPageTabStackParamList };
};

const HomeBottomTabNavigator = () => {
  const HomeBottom = createBottomTabNavigator<HomeBottomParamList>();
  return (
    <HomeBottom.Navigator
      screenOptions={{
        tabBarActiveTintColor: mainColor,
        tabBarInactiveTintColor: subTextColor,
        tabBarHideOnKeyboard: true,
        headerShown: false,
      }}
    >
      <HomeBottom.Screen
        name='MyDiaryTab'
        component={MyDiaryTabNavigator}
        options={{
          tabBarLabel: I18n.t('mainTab.myDiary'),
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name='book-open' size={25} color={color} />
          ),
        }}
      />
      <HomeBottom.Screen
        name='PostDiaryTab'
        // @ts-ignore
        component={PostDiaryScreenContainer}
        options={{
          tabBarLabel: I18n.t('mainTab.postDiary'),
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialCommunityIcons name='pencil' size={25} color={color} />
          ),
        }}
        listeners={({
          navigation,
        }: {
          navigation: HomeBottomNavigationProp;
        }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate('ModalPostDiary', {
              screen: 'PostDiary',
            });
          },
        })}
      />
      <HomeBottom.Screen
        name='MyPageTab'
        component={MyPageTabNavigator}
        options={{
          tabBarLabel: I18n.t('mainTab.myPage'),
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons name='person' size={25} color={color} />
          ),
        }}
      />
    </HomeBottom.Navigator>
  );
};

export default HomeBottomTabNavigator;
