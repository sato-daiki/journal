import { connect } from 'react-redux';
import { signIn } from '../stores/actions/localStatus';
import { setUser } from '../stores/actions/user';

import { State } from '../types/state';
import SignUpScreen, { Props } from '@/screens/Auth/SignUpScreen';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  signIn,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
