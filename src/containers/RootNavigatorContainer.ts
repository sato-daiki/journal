import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import { restoreUid } from '../stores/actions/localStatus';
import RootNavigator, { Props } from '../navigations/RootNavigator';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
    localStatus: state.rootReducer.localStatus,
  };
};

const mapDispatchToProps = {
  setUser,
  restoreUid,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);
