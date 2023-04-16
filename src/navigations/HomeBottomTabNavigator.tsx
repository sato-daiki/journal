import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
// import { mainColor, maxLayoutChange } from '../styles/Common';
import I18n from '../utils/I18n';
import { TabIcon } from '../components/molecules';
import PostDiaryScreenContainer from '../containers/PostDiaryScreenContainer';
import MyDiaryTabNavigator, {
  MyDiaryTabStackParamList,
} from './MyDiaryTabNavigator';
// import TeachDiaryTabNavigator, {
//   TeachDiaryTabStackParamList,
// } from './TeachDiaryTabNavigator';
import MyPageTabNavigator, {
  MyPageTabStackParamList,
} from './MyPageTabNavigator';
import { MainStackParamList, MainNavigationProp } from './MainNavigator';
// import CustomDrawerContent from '../components/web/organisms/CustomDrawerContent';
// import { DrawerLabel } from '../components/web/molecules';

export type HomeBottomNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MainStackParamList, 'Home'>,
  MainNavigationProp
>;

export type HomeBottomParamList = {
  // MyDiaryTab: { screen: keyof MyDiaryTabStackParamList };
  // PostDiaryTab: undefined;
  // TeachDiaryTab: { screen: keyof TeachDiaryTabStackParamList };
  // MyPageTab: { screen: keyof MyPageTabStackParamList };
};

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: undefined,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const HomeBottomTabNavigator = () => {
  const HomeBottom = createBottomTabNavigator<HomeBottomParamList>();
  return (
    <HomeBottom.Navigator
    // tabBarOptions={{ activeTintColor: mainColor, keyboardHidesTabBar: true }}
    >
      <HomeBottom.Screen
        name='MyDiaryTab'
        component={MyDiaryTabNavigator}
        options={{
          tabBarLabel: I18n.t('mainTab.myDiary'),
          tabBarIcon: ({ color }: { color: string }) => (
            <TabIcon
              name='book-open'
              size={25}
              color={color}
              badgeMode='myDiary'
            />
          ),
        }}
      />
      <HomeBottom.Screen
        name='PostDiaryTab'
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
            navigation.navigate('ModalSelectDiaryType', {
              screen: 'SelectDiaryType',
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
