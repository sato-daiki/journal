import { connect } from 'react-redux';
import ReminderSelectTimeSettingScreen, {
  Props,
} from '@/screens/Onboarding/ReminderSelectTimeScreen/ReminderSelectTimeSettingScreen';

import { State } from '@/types/state';
import { setUser } from '@/stores/actions/user';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;
  return {
    user,
  };
};

const mapDispatchToProps = {
  setUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReminderSelectTimeSettingScreen);
