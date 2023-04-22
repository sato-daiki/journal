import { CombinedState, combineReducers } from 'redux';
import { persistReducer, createTransform } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import JSOG from 'jsog';
import localStatus from './localStatus';
import user from './user';
import diaryList, { DiaryListState } from './diaryList';

import { Types } from '../types';
import { Actions } from '../../types/state';
import { LocalStatus, User } from '../../types';

const JSOGTransform = createTransform(
  (inboundState) => JSOG.encode(inboundState),
  (outboundState) => JSOG.decode(outboundState),
);

type State = CombinedState<{
  localStatus: LocalStatus;
  user: {} | User;
  diaryList: DiaryListState;
}>;

const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['localStatus', 'user'],
  blackList: ['diaryList'],
  // これやらないとエラーで落ちる
  transforms: [JSOGTransform],
};

const appReducer = combineReducers({
  localStatus,
  user,
  diaryList,
});

const rootReducer = (
  state: State | undefined,
  action: Actions,
): CombinedState<State> => {
  if (action.type === Types.SIGN_OUT) {
    AsyncStorage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default persistReducer(rootPersistConfig, rootReducer);
