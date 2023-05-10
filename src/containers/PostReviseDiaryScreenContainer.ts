import { connect } from 'react-redux';
import { State } from '@/types/state';
import { editDiary } from '@/stores/actions/diaryList';
import PostReviseDiaryScreen, {
  Props,
} from '@/screens/PostDiaryTab/PostReviseDiaryScreen/PostReviseDiaryScreen';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
  };
};

const mapDispatchToProps = {
  editDiary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostReviseDiaryScreen);
