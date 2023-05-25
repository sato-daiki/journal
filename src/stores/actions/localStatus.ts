import { Action } from 'redux';
import { MyDiaryListView } from '../../types/localStatus';
import { Types } from '../types';

export interface SetLocalStatusAction extends Action {
  type: Types.SET_IS_PREMIUM;
  isPremium: boolean;
}

export const setIsPremium = (isPremium: boolean): SetLocalStatusAction => ({
  type: Types.SET_IS_PREMIUM,
  isPremium,
});

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

export interface RestoreUidAction extends Action {
  type: Types.RESTORE_UID;
  payload: {
    uid: string | null;
    onboarding?: boolean;
  };
}

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
