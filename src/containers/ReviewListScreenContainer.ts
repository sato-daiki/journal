import { connect } from 'react-redux';
import { State } from '../types/state';
import ReviewListScreen, { Props } from '../screens/ReviewListScreen';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;

  return {
    user,
  };
};

export default connect(mapStateToProps)(ReviewListScreen);
