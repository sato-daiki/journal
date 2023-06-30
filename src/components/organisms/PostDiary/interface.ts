import { Animated } from 'react-native';
import { ImageInfo, ThemeCategory, ThemeSubcategory } from '@/types';
import { PostDiaryNavigationProp } from '@/screens/PostDiaryTab/PostDiaryScreen/interfaces';
import { PostDraftDiaryNavigationProp } from '@/screens/PostDiaryTab/PostDraftDiaryScreen/interfaces';
import { PostReviseDiaryNavigationProp } from '@/screens/PostDiaryTab/PostReviseDiaryScreen/PostReviseDiaryScreen';
import { PickerItem } from '@/components/molecules/ModalPicker';

export interface PostDiaryKeyboardProps {
  title: string;
  text: string;
  images?: ImageInfo[] | null;
  themeCategory?: ThemeCategory;
  themeSubcategory?: ThemeSubcategory;
  isForce?: boolean;
  isTopic: boolean;
  isImageLoading: boolean;
  fadeAnim?: Animated.Value;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressChooseImage: () => void;
  onPressCamera: () => void;
  onPressImage: (index: number) => void;
  onPressDeleteImage: (image: ImageInfo) => void;
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
    | PostReviseDiaryNavigationProp;
  isLoading: boolean;
  isModalCancel: boolean;
  isModalError: boolean;
  isImageLoading: boolean;
  title: string;
  text: string;
  images?: ImageInfo[] | null;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  errorMessage: string;
  selectedItem?: PickerItem;
  onPressCloseModalCancel: () => void;
  onChangeTextTitle: (txt: string) => void;
  onChangeTextText: (txt: string) => void;
  onPressChooseImage: () => void;
  onPressCamera: () => void;
  onPressDeleteImage: (image: ImageInfo) => void;
  onPressDraft?: () => void;
  onPressMyDiary?: () => void;
  onPressNotSave: () => void;
  onPressCloseError: () => void;
  onPressItem?: (item: PickerItem) => void;
}
