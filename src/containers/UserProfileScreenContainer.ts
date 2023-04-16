import { connect } from 'react-redux';
import { State } from '../types/state';
import UserProfileScreen, { Props } from '../screens/UserProfileScreen';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
  };
};

export default connect(mapStateToProps)(UserProfileScreen);
