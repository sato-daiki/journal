import {
  ModalTopicGuideStackNavigationProp,
  ModalTopicGuideStackParamList,
} from '@/navigations/ModalNavigator';
import { User } from '@/types';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface Props {
  user: User;
}

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalTopicGuideStackParamList, 'TopicGuide'>,
  ModalTopicGuideStackNavigationProp
>;

type TopicGuideRouteProp = RouteProp<
  ModalTopicGuideStackParamList,
  'TopicGuide'
>;

export type ScreenType = {
  navigation: NavigationProp;
  route: TopicGuideRouteProp;
} & Props;
