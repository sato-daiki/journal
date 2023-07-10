import { Actions } from '../../types/state';
import { Types } from '../types';
import { LocalStatus } from '../../types';
import { DEFAULT_FONT_SIZE } from '@/constants/common';

const initialState: LocalStatus = {
  isLoading: true,
  hasPasscode: false,
  showCheckPasscode: false,
  isLoadingPasscode: false,
  isPremium: false,
  onboarding: null,
  firstLogin: false,
  myDiaryListView: 'list',
  darkMode: 'device',
  fontSize: DEFAULT_FONT_SIZE,
  themeColor: 'default',
  uid: null,
};

const localStatus = (state = initialState, action: Actions): LocalStatus => {
  switch (action.type) {
    case Types.SET_MY_DIARY_LIST_VIEW:
      return {
        ...state,
        myDiaryListView: action.myDiaryListView,
      };
    case Types.SET_HAS_PASS_CODE:
      return {
        ...state,
        hasPasscode: action.hasPasscode,
      };
    case Types.SET_SHOW_CHECK_PASS_CODE:
      return {
        ...state,
        showCheckPasscode: action.showCheckPasscode,
      };
    case Types.SET_IS_LOADING_HAS_CODE:
      return {
        ...state,
        isLoadingPasscode: action.isLoadingPasscode,
      };
    case Types.SET_IS_PREMIUM:
      return {
        ...state,
        isPremium: action.isPremium,
      };
    case Types.SET_DARK_MODE:
      return {
        ...state,
        darkMode: action.darkMode,
      };
    case Types.SET_THEME_COLOR:
      return {
        ...state,
        themeColor: action.themeColor,
      };
    case Types.SET_FONT_SIZE:
      return {
        ...state,
        fontSize: action.fontSize,
      };
    case Types.RESTORE_UID:
      return {
        ...state,
        uid: action.payload.uid,
        onboarding: action.payload.onboarding,
        isLoading: false,
        firstLogin: false,
      };
    case Types.COMPLETED_ONBOARDING:
      return {
        ...state,
        onboarding: true,
        firstLogin: true,
      };
    case Types.SIGN_IN:
      return {
        ...state,
        uid: action.uid,
      };
    case Types.SIGN_OUT:
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
};

export default localStatus;
