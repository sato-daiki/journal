import { Animated } from 'react-native';
import { Language, ThemeCategory, ThemeSubcategory } from '@/types';
import { PostDiaryNavigationProp } from '@/screens/PostDiaryTab/PostDiaryScreen/interfaces';
import { PostDraftDiaryNavigationProp } from '@/screens/PostDiaryTab/PostDraftDiaryScreen/interfaces';

export interface PostDiaryKeyboardProps {
  title: string;
  text: string;
  themeCategory?: ThemeCategory;
  themeSubcategory?: ThemeSubcategory;
  learnLanguage: Language;
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
  isModalLack: boolean;
  isModalAlert: boolean;
  isModalCancel: boolean;
  isModalError: boolean;
  isPublish: boolean;
  isTutorialLoading?: boolean;
  tutorialPostDiary?: boolean;
  errorMessage: string;
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  publishMessage: string | null;
  points: number;
  learnLanguage: Language;
  nativeLanguage: Language;
  onPressSubmitModalLack: () => void;
  onPressCloseModalLack: () => void;
  onPressWatchAdModalLack?: () => void;
  onPressCloseModalPublish: () => void;
  onPressCloseModalCancel: () => void;
  onClosePostDiary: () => void;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressSubmit: () => void;
  onPressDraft: () => void;
  onPressNotSave: () => void;
  onPressTutorial?: () => void;
  onPressCloseError: () => void;
}
