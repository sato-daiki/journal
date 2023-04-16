import { connect } from 'react-redux';
import { State } from '@/types/state';
import { setUser } from '@/stores/actions/user';
import { editDiary } from '@/stores/actions/diaryList';
import PostDraftDiaryScreen, {
  Props,
} from '@/screens/PostDiaryTab/PostDraftDiaryScreen/PostDraftDiaryScreen';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
  };
};

const mapDispatchToProps = {
  setUser,
  editDiary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDraftDiaryScreen);
