import { connect } from 'react-redux';
import DisplayScreen, { Props } from '../screens/SettingTab/DisplayScreen';
import { State } from '../types/state';
import { setDarkMode, setThemeColor } from '@/stores/actions/localStatus';

const mapStateToProps = (state: State): Props => ({
  localStatus: state.rootReducer.localStatus,
});

const mapDispatchToProps = {
  setDarkMode,
  setThemeColor,
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayScreen);
