import {
  ModalPostDiaryStackNavigationProp,
  ModalPostDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Diary, User } from '@/types';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
  addDiary: (diary: Diary) => void;
}

export type PostDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostDiaryStackParamList, 'PostDiary'>,
  ModalPostDiaryStackNavigationProp
>;

export type ScreenType = {
  navigation: PostDiaryNavigationProp;
  route?: RouteProp<ModalPostDiaryStackParamList, 'PostDiary'>;
} & Props &
  DispatchProps;
