import { Action } from 'redux';
import { DarkMode, MyDiaryListView, ThemeColor } from '../../types/localStatus';
import { Types } from '../types';

export interface SetMyDiaryListViewAction extends Action {
  type: Types.SET_MY_DIARY_LIST_VIEW;
  myDiaryListView: MyDiaryListView;
}

export const setMyDiaryListView = (
  myDiaryListView: MyDiaryListView,
): SetMyDiaryListViewAction => ({
  type: Types.SET_MY_DIARY_LIST_VIEW,
  myDiaryListView,
});

export interface SetHasPasscodeAction extends Action {
  type: Types.SET_HAS_PASS_CODE;
  hasPasscode: boolean;
}

export const setHasPasscode = (hasPasscode: boolean): SetHasPasscodeAction => ({
  type: Types.SET_HAS_PASS_CODE,
  hasPasscode,
});

export interface SetShowCheckPasscodeAction extends Action {
  type: Types.SET_SHOW_CHECK_PASS_CODE;
  showCheckPasscode: boolean;
}

export const setShowCheckPasscode = (
  showCheckPasscode: boolean,
): SetShowCheckPasscodeAction => ({
  type: Types.SET_SHOW_CHECK_PASS_CODE,
  showCheckPasscode,
});

export interface SetIsLoadingPasscodeAction extends Action {
  type: Types.SET_IS_LOADING_HAS_CODE;
  isLoadingPasscode: boolean;
}

export const setIsLoadingPasscode = (
  isLoadingPasscode: boolean,
): SetIsLoadingPasscodeAction => ({
  type: Types.SET_IS_LOADING_HAS_CODE,
  isLoadingPasscode,
});

export interface SetIsPremiumAction extends Action {
  type: Types.SET_IS_PREMIUM;
  isPremium: boolean;
}

export const setIsPremium = (isPremium: boolean): SetIsPremiumAction => ({
  type: Types.SET_IS_PREMIUM,
  isPremium,
});

export interface RestoreUidAction extends Action {
  type: Types.RESTORE_UID;
  payload: {
    uid: string | null;
    onboarding?: boolean;
  };
}

export interface SetDarkModeAction extends Action {
  type: Types.SET_DARK_MODE;
  darkMode: DarkMode;
}

export const setDarkMode = (darkMode: DarkMode): SetDarkModeAction => ({
  type: Types.SET_DARK_MODE,
  darkMode,
});

export interface SetThemeColorAction extends Action {
  type: Types.SET_THEME_COLOR;
  themeColor: ThemeColor;
}

export const setThemeColor = (themeColor: ThemeColor): SetThemeColorAction => ({
  type: Types.SET_THEME_COLOR,
  themeColor,
});

export const restoreUid = (
  uid: string | null,
  onboarding?: boolean,
): RestoreUidAction => ({
  type: Types.RESTORE_UID,
  payload: {
    uid,
    onboarding,
  },
});

export interface CompletedOnboardingAction extends Action {
  type: Types.COMPLETED_ONBOARDING;
}

export const completedOnboarding = (): CompletedOnboardingAction => ({
  type: Types.COMPLETED_ONBOARDING,
});

export interface SignInAction extends Action {
  type: Types.SIGN_IN;
  uid: string;
}

export const signIn = (uid: string): SignInAction => ({
  type: Types.SIGN_IN,
  uid,
});

export interface SignOutAction extends Action {
  type: Types.SIGN_OUT;
}

export const signOut = (): SignOutAction => ({
  type: Types.SIGN_OUT,
});
