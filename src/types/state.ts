import {
  ThunkAction as OrgThunkAction,
  ThunkDispatch as OrgThunkDispatch,
} from 'redux-thunk';
import { LocalStatus } from './localStatus';
import { User } from './user';
import { DiaryListState } from '../stores/reducers/diaryList';
import { SetUserAction } from '../stores/actions/user';
import {
  SetDiariesAction,
  AddDiariesAction,
  SetDiaryTotalNumAction,
  SetFetchInfoAction,
  AddDiaryAction,
  EditDiaryAction,
  DeleteDiaryAction,
} from '../stores/actions/diaryList';
import {
  SetMyDiaryListViewAction,
  RestoreUidAction,
  CompletedOnboardingAction,
  SignInAction,
  SignOutAction,
  SetHasPasscodeAction,
  SetShowCheckPasscodeAction,
  SetIsLoadingPasscodeAction,
  SetIsPremiumAction,
  SetDarkModeAction,
  SetThemeColorAction,
} from '../stores/actions/localStatus';

export interface State {
  rootReducer: {
    localStatus: LocalStatus;
    user: User;
    diaryList: DiaryListState;
  };
}

export type Actions =
  | SetMyDiaryListViewAction
  | SetHasPasscodeAction
  | SetShowCheckPasscodeAction
  | SetIsLoadingPasscodeAction
  | SetIsPremiumAction
  | SetDarkModeAction
  | SetThemeColorAction
  | RestoreUidAction
  | CompletedOnboardingAction
  | SignInAction
  | SignOutAction
  | SetUserAction
  | SetFetchInfoAction
  | SetDiariesAction
  | AddDiariesAction
  | SetDiaryTotalNumAction
  | AddDiaryAction
  | EditDiaryAction
  | DeleteDiaryAction;

export type ThunkAction<R> = OrgThunkAction<R, State, undefined, Actions>;
export type ThunkDispatch = OrgThunkDispatch<State, undefined, Actions>;
