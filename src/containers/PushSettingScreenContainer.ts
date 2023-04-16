import { connect } from 'react-redux';
import PushSettingScreen, {
  Props,
} from '@/screens/Onboarding/PushSettingScreen';
import { setUser } from '@/stores/actions/user';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
    localStatus: state.rootReducer.localStatus,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PushSettingScreen);
