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
import SettingTabNavigator, {
  SettingTabStackParamList,
} from './SettingTabNavigator';
import { MainStackParamList, MainNavigationProp } from './MainNavigator';
import { User } from '@/types';
import { getLanguageToolCode } from '@/utils/grammarCheck';
import { useAppTheme } from '@/styles/colors';

export interface Props {
  user: User;
}

export type HomeBottomNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Home'>,
  MainNavigationProp
>;

export type HomeBottomParamList = {
  MyDiaryTab: {
    screen: keyof MyDiaryTabStackParamList;
  };
  PostDiaryTab: undefined;
  SettingTab: { screen: keyof SettingTabStackParamList };
};

const HomeBottomTabNavigator: React.FC<Props> = ({ user }) => {
  const theme = useAppTheme();
  const HomeBottom = createBottomTabNavigator<HomeBottomParamList>();
  return (
    <HomeBottom.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.background },
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.secondary,
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
            <MaterialCommunityIcons size={25} color={color} name='book-open' />
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
            <MaterialCommunityIcons size={25} color={color} name='pencil' />
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
            if (getLanguageToolCode(user.learnLanguage) === 'en') {
              navigation.navigate('ModalSelectDiaryType', {
                screen: 'SelectDiaryType',
              });
            } else {
              navigation.navigate('ModalPostDiary', {
                screen: 'PostDiary',
              });
            }
          },
        })}
      />
      <HomeBottom.Screen
        name='SettingTab'
        component={SettingTabNavigator}
        options={{
          tabBarLabel: I18n.t('mainTab.setting'),
          tabBarIcon: ({ color }: { color: string }) => (
            <MaterialIcons size={25} color={color} name='settings' />
          ),
        }}
      />
    </HomeBottom.Navigator>
  );
};

export default HomeBottomTabNavigator;
