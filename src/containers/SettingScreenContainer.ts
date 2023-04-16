import { connect } from 'react-redux';
import SettingScreen, { Props } from '../screens/MyPageTab/SettingScreen';
import { signOut } from '../stores/actions/localStatus';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
