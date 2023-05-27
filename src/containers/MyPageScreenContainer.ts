import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import MyPageScreen, { Props } from '../screens/MyPageTab/MyPageScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
  localStatus: state.rootReducer.localStatus,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen);
