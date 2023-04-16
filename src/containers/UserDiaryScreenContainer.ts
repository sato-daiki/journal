import { connect } from 'react-redux';
import { State } from '../types/state';
import UserDiaryScreen, { Props } from '../screens/UserDiaryScreen';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;
  return {
    user,
  };
};

export default connect(mapStateToProps)(UserDiaryScreen);
