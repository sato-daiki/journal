import { connect } from 'react-redux';
import ReminderSelectTimeOnboardingScreen, {
  Props,
} from '@/screens/Onboarding/ReminderSelectTimeScreen/ReminderSelectTimeOnboardingScreen';

import { State } from '@/types/state';
import { setUser } from '@/stores/actions/user';
import { completedOnboarding } from '@/stores/actions/localStatus';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;
  return {
    user,
  };
};

const mapDispatchToProps = {
  setUser,
  completedOnboarding,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReminderSelectTimeOnboardingScreen);
