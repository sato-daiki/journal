import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import { State } from '../types/state';
import EditMyProfileScreen, {
  Props,
} from '@/screens/Modal/EditMyProfileScreen';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMyProfileScreen);
