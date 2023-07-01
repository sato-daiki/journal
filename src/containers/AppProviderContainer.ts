import { connect } from 'react-redux';
import { State } from '../types/state';
import AppProvider, { Props } from '@/AppProvider';

const mapStateToProps = (state: State): Props => {
  return {
    localStatus: state.rootReducer.localStatus,
  };
};

export default connect(mapStateToProps)(AppProvider);
