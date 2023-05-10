import {
  ModalPostReviseDiaryStackNavigationProp,
  ModalPostReviseDiaryStackParamList,
} from '@/navigations/ModalNavigator';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Diary, User } from '@/types';

export interface Props {
  user: User;
}

interface DispatchProps {
  setUser: (user: User) => void;
  editDiary: (objectID: string, diary: Diary) => void;
}

export type PostReviseDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostReviseDiaryStackParamList, 'PostReviseDiary'>,
  ModalPostReviseDiaryStackNavigationProp
>;

export type PostReviseDiaryRouteProp = RouteProp<
  ModalPostReviseDiaryStackParamList,
  'PostReviseDiary'
>;

export type ScreenType = {
  navigation: PostReviseDiaryNavigationProp;
  route: PostReviseDiaryRouteProp;
} & Props &
  DispatchProps;
