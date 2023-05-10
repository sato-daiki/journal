import {
  ModalPostFairCopyDiaryStackNavigationProp,
  ModalPostFairCopyDiaryStackParamList,
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

export type PostFairCopyDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<
    ModalPostFairCopyDiaryStackParamList,
    'PostFairCopyDiary'
  >,
  ModalPostFairCopyDiaryStackNavigationProp
>;

export type PostFairCopyDiaryRouteProp = RouteProp<
  ModalPostFairCopyDiaryStackParamList,
  'PostFairCopyDiary'
>;

export type ScreenType = {
  navigation: PostFairCopyDiaryNavigationProp;
  route: PostFairCopyDiaryRouteProp;
} & Props &
  DispatchProps;
