import { connect } from 'react-redux';
import DisplayScreen, { Props } from '../screens/SettingTab/DisplayScreen';
import { State } from '../types/state';
import { setUser } from '@/stores/actions/user';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayScreen);
