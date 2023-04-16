import { Action } from 'redux';
import { Types } from '../types';
import { Diary } from '../../types';
import { FetchInfoState } from '../reducers/diaryList';

export interface SetDiariesAction extends Action {
  type: Types.SET_DIARIES;
  diaries: Diary[];
}

export const setDiaries = (diaries: Diary[]): SetDiariesAction => ({
  type: Types.SET_DIARIES,
  diaries,
});

export interface AddDiariesAction extends Action {
  type: Types.ADD_DIARIES;
  diaries: Diary[];
}

export const addDiaries = (diaries: Diary[]): AddDiariesAction => ({
  type: Types.ADD_DIARIES,
  diaries,
});

export interface SetFetchInfoAction extends Action {
  type: Types.SET_FETCH_INFO;
  fetchInfo: FetchInfoState;
}

export const setFetchInfo = (
  fetchInfo: FetchInfoState
): SetFetchInfoAction => ({
  type: Types.SET_FETCH_INFO,
  fetchInfo,
});

export interface SetDiaryTotalNumAction extends Action {
  type: Types.SET_DIARY_TOTAL_NUM;
  diaryTotalNum: number;
}

export const setDiaryTotalNum = (
  diaryTotalNum: number
): SetDiaryTotalNumAction => ({
  type: Types.SET_DIARY_TOTAL_NUM,
  diaryTotalNum,
});

export interface AddDiaryAction extends Action {
  type: Types.ADD_DIARY;
  diary: Diary;
}

export const addDiary = (diary: Diary): AddDiaryAction => ({
  type: Types.ADD_DIARY,
  diary,
});

export interface EditDiaryAction extends Action {
  type: Types.EDIT_DIARY;
  payload: {
    objectID: string;
    diary: Diary;
  };
}

export const editDiary = (objectID: string, diary: Diary): EditDiaryAction => ({
  type: Types.EDIT_DIARY,
  payload: {
    objectID,
    diary,
  },
});

export interface DeleteDiaryAction extends Action {
  type: Types.DELETE_DIARY;
  objectID: string;
}

export const deleteDiary = (objectID: string): DeleteDiaryAction => ({
  type: Types.DELETE_DIARY,
  objectID,
});
