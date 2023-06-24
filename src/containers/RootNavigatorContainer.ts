import { connect } from 'react-redux';
import { setUser } from '../stores/actions/user';
import {
  restoreUid,
  setIsPremium,
  setShowCheckPasscode,
  setIsLoadingPasscode,
} from '../stores/actions/localStatus';
import RootNavigator, { Props } from '../navigations/RootNavigator';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => {
  return {
    localStatus: state.rootReducer.localStatus,
  };
};

const mapDispatchToProps = {
  setUser,
  restoreUid,
  setIsPremium,
  setShowCheckPasscode,
  setIsLoadingPasscode,
};

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigator);
