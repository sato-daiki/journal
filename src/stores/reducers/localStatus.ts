import { Actions } from '../../types/state';
import { Types } from '../types';
import { LocalStatus } from '../../types';

const initialState: LocalStatus = {
  isLoading: true,
  onboarding: null,
  firstLogin: false,
  myDiaryListView: 'list',
  uid: null,
};

const localStatus = (state = initialState, action: Actions): LocalStatus => {
  console.log('localStatus', state, action);

  switch (action.type) {
    case Types.SET_LOCAL_STATUS:
      return action.localStatus;
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
