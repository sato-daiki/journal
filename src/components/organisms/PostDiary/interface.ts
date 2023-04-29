import { Animated } from 'react-native';
import { LongCode, ThemeCategory, ThemeSubcategory } from '@/types';
import { PostDiaryNavigationProp } from '@/screens/PostDiaryTab/PostDiaryScreen/interfaces';
import { PostDraftDiaryNavigationProp } from '@/screens/PostDiaryTab/PostDraftDiaryScreen/interfaces';

export interface PostDiaryKeyboardProps {
  title: string;
  text: string;
  themeCategory?: ThemeCategory;
  themeSubcategory?: ThemeSubcategory;
  learnLanguage: LongCode;
  isForce?: boolean;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft: () => void;
  onFocusText: () => void;
  onBlurText: () => void;
  onPressThemeGuide: () => void;
  fadeAnim?: Animated.Value;
}

export interface PostDiaryProps {
  navigation: PostDiaryNavigationProp | PostDraftDiaryNavigationProp;
  isLoading: boolean;
  isModalCancel: boolean;
  isTutorialLoading?: boolean;
  isModalError: boolean;
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  learnLanguage: LongCode;
  errorMessage: string;
  onPressCloseModalCancel: () => void;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft: () => void;
  onPressNotSave: () => void;
  onPressTutorial?: () => void;
  onPressCloseError: () => void;
}
