import { connect } from 'react-redux';
import SettingScreen, { Props } from '../screens/MyPageTab/SettingScreen';
import { setHasPasscode, signOut } from '@/stores/actions/localStatus';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
  localStatus: state.rootReducer.localStatus,
});

const mapDispatchToProps = {
  signOut,
  setHasPasscode,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingScreen);
