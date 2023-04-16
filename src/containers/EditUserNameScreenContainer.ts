import { connect } from 'react-redux';
import EditUserNameScreen, { Props } from '../screens/EditUserNameScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

export default connect(mapStateToProps)(EditUserNameScreen);
