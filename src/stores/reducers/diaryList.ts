import { Actions } from '../../types/state';
import { Types } from '../types';
import { Diary } from '../../types';
import { DeleteDiaryAction } from '../actions/diaryList';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface FetchInfoState {
  lastVisible: FirebaseFirestoreTypes.Timestamp | null;
  readingNext: boolean;
  readAllResults: boolean;
}

export interface DiaryListState {
  diaries: Diary[];
  diaryTotalNum: number;
  fetchInfo: FetchInfoState;
}

const initialState: DiaryListState = {
  diaries: [],
  diaryTotalNum: 0,
  fetchInfo: {
    lastVisible: null,
    readingNext: false,
    readAllResults: false,
  },
};

const editDiary = (
  state: DiaryListState,
  payload: {
    objectID: string;
    diary: Diary;
  },
): DiaryListState => {
  const { objectID, diary } = payload;
  const newDiaries = state.diaries.map((item) => {
    if (item.objectID !== objectID) {
      return item;
    }
    return {
      ...item,
      ...diary,
    };
  });
  return {
    ...state,
    diaries: newDiaries,
  };
};

const deleteDiary = (
  state: DiaryListState,
  action: DeleteDiaryAction,
): DiaryListState => {
  const { objectID } = action;
  return {
    ...state,
    diaries: state.diaries.filter((item) => item.objectID !== objectID),
    diaryTotalNum: state.diaryTotalNum - 1,
  };
};

const diaryList = (state = initialState, action: Actions): DiaryListState => {
  switch (action.type) {
    case Types.SET_FETCH_INFO:
      return {
        ...state,
        fetchInfo: action.fetchInfo,
      };
    case Types.SET_DIARIES:
      return {
        ...state,
        diaries: action.diaries,
      };
    case Types.ADD_DIARIES:
      return {
        ...state,
        diaries: [...state.diaries, ...action.diaries],
      };
    case Types.SET_DIARY_TOTAL_NUM:
      return {
        ...state,
        diaryTotalNum: action.diaryTotalNum,
      };
    case Types.ADD_DIARY:
      return {
        ...state,
        diaries: [action.diary, ...state.diaries],
        diaryTotalNum: state.diaryTotalNum + 1,
      };
    case Types.EDIT_DIARY:
      return editDiary(state, action.payload);
    case Types.DELETE_DIARY:
      return deleteDiary(state, action);
    default:
      return state;
  }
};

export default diaryList;
