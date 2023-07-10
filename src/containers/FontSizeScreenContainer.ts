import { connect } from 'react-redux';
import FontSizeScreen, { Props } from '../screens/SettingTab/FontSizeScreen';
import { State } from '../types/state';
import { setFontSize } from '@/stores/actions/localStatus';

const mapStateToProps = (state: State): Props => ({
  localStatus: state.rootReducer.localStatus,
});

const mapDispatchToProps = {
  setFontSize,
};

export default connect(mapStateToProps, mapDispatchToProps)(FontSizeScreen);
