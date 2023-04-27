import { connect } from 'react-redux';
import HomeBottomTabNavigator, {
  Props,
} from '../navigations/HomeBottomTabNavigator';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
  };
};

export default connect(mapStateToProps)(HomeBottomTabNavigator);
