import { Actions } from '../../types/state';
import { Types } from '../types';
import { Diary } from '../../types';

export interface TeachDiaryListState {
  teachDiaries: Diary[];
}

const initialState: TeachDiaryListState = {
  teachDiaries: [],
};

const editTeachDiary = (
  state: TeachDiaryListState,
  payload: {
    objectID: string;
    teachDiary: Diary;
  }
): TeachDiaryListState => {
  const { objectID, teachDiary } = payload;
  const newTeachDiaries = state.teachDiaries.map(item => {
    if (item.objectID !== objectID) {
      return item;
    }
    return {
      ...item,
      ...teachDiary,
    };
  });
  return {
    ...state,
    teachDiaries: newTeachDiaries,
  };
};

const teachDiaryList = (
  state = initialState,
  action: Actions
): TeachDiaryListState => {
  switch (action.type) {
    case Types.SET_TEACH_DIARIES:
      return {
        ...state,
        teachDiaries: action.teachDiaries,
      };
    case Types.EDIT_TEACH_DIARY:
      return editTeachDiary(state, action.payload);
    default:
      return state;
  }
};
export default teachDiaryList;
