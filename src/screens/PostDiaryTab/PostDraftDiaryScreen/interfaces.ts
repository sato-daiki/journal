import {
  ModalPostDraftDiaryStackNavigationProp,
  ModalPostDraftDiaryStackParamList,
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

export type PostDraftDiaryNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalPostDraftDiaryStackParamList, 'PostDraftDiary'>,
  ModalPostDraftDiaryStackNavigationProp
>;

export type PostDraftDiaryRouteProp = RouteProp<
  ModalPostDraftDiaryStackParamList,
  'PostDraftDiary'
>;

export type ScreenType = {
  navigation: PostDraftDiaryNavigationProp;
  route: PostDraftDiaryRouteProp;
} & Props &
  DispatchProps;
