import { Action } from 'redux';
import { User } from '../../types/user';
import { Types } from '../types';

export interface SetProfileAction extends Action {
  type: Types.SET_PROFILE;
  user: User;
}

export const setUser = (user: User): SetProfileAction => ({
  type: Types.SET_PROFILE,
  user,
});
