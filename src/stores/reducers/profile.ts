import { Actions } from '../../types/state';
import { Types } from '../types';
import { User } from '../../types';

const user = (state = {}, action: Actions): User | {} => {
  switch (action.type) {
    case Types.SET_PROFILE:
      return action.user;
    default:
      return state;
  }
};

export default user;
