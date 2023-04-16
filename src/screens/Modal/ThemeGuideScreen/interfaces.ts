import {
  ModalThemeGuideStackNavigationProp,
  ModalThemeGuideStackParamList,
} from '@/navigations/ModalNavigator';
import { User } from '@/types';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface Props {
  user: User;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalThemeGuideStackParamList, 'ThemeGuide'>,
  ModalThemeGuideStackNavigationProp
>;

type ThemeGuideRouteProp = RouteProp<
  ModalThemeGuideStackParamList,
  'ThemeGuide'
>;

export type ScreenType = {
  navigation: NavigationProp;
  route: ThemeGuideRouteProp;
} & Props;
