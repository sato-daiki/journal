import { connect } from 'react-redux';
import { State } from '@/types/state';
import TeachDiarySearchScreen, {
  Props,
} from '@/screens/TeachDiarySearchScreen';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;
  return {
    user,
  };
};

export default connect(mapStateToProps)(TeachDiarySearchScreen);
