import { connect } from 'react-redux';
import { setShowCheckPasscode } from '@/stores/actions/localStatus';

import { setUser } from '@/stores/actions/user';
import { State } from '@/types/state';
import CheckPasscodeLockScreen, {
  Props,
} from '@/screens/CheckPasscodeLockScreen';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  setUser,
  setShowCheckPasscode,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckPasscodeLockScreen);
