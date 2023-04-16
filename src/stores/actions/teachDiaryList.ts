import { Action } from 'redux';
import { Types } from '../types';
import { Diary } from '../../types';

export interface SetTeachDiariesAction extends Action {
  type: Types.SET_TEACH_DIARIES;
  teachDiaries: Diary[];
}

export const setTeachDiaries = (
  teachDiaries: Diary[]
): SetTeachDiariesAction => ({
  type: Types.SET_TEACH_DIARIES,
  teachDiaries,
});

export interface EditTeachDiaryAction extends Action {
  type: Types.EDIT_TEACH_DIARY;
  payload: {
    objectID: string;
    teachDiary: Diary;
  };
}

export const editTeachDiary = (
  objectID: string,
  teachDiary: Diary
): EditTeachDiaryAction => ({
  type: Types.EDIT_TEACH_DIARY,
  payload: {
    objectID,
    teachDiary,
  },
});
