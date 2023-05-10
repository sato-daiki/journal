import { Animated } from 'react-native';
import { ThemeCategory, ThemeSubcategory } from '@/types';
import { PostDiaryNavigationProp } from '@/screens/PostDiaryTab/PostDiaryScreen/interfaces';
import { PostDraftDiaryNavigationProp } from '@/screens/PostDiaryTab/PostDraftDiaryScreen/interfaces';
import { PickerItem } from '@/components/molecules/LanguageModalPicker';
import { PostFairCopyDiaryNavigationProp } from '@/screens/PostDiaryTab/PostFairCopyDiaryScreen/PostFairCopyDiaryScreen';

export interface PostDiaryKeyboardProps {
  title: string;
  text: string;
  themeCategory?: ThemeCategory;
  themeSubcategory?: ThemeSubcategory;
  isForce?: boolean;
  isTopic: boolean;
  fadeAnim?: Animated.Value;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft?: () => void;
  onFocusText: () => void;
  onBlurText: () => void;
  onPressTopicGuide: () => void;
  onPressMyDiary?: () => void;
}

export interface PostDiaryProps {
  navigation:
    | PostDiaryNavigationProp
    | PostDraftDiaryNavigationProp
    | PostFairCopyDiaryNavigationProp;
  isLoading: boolean;
  isModalCancel: boolean;
  isModalError: boolean;
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  errorMessage: string;
  selectedItem?: PickerItem;
  onPressCloseModalCancel: () => void;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressDraft?: () => void;
  onPressMyDiary?: () => void;
  onPressNotSave: () => void;
  onPressTutorial?: () => void;
  onPressCloseError: () => void;
  onPressItem?: (item: PickerItem) => void;
}
