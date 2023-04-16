import { connect } from 'react-redux';
import ReminderInitialOnboardingScreen, {
  Props,
} from '@/screens/Onboarding/ReminderInitialOnboardingScreen';

import { State } from '@/types/state';
import { completedOnboarding } from '@/stores/actions/localStatus';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;
  return {
    user,
  };
};

const mapDispatchToProps = {
  completedOnboarding,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ReminderInitialOnboardingScreen);
