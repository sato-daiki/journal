import { connect } from 'react-redux';
import EditMyDiaryListScreen, {
  Props,
} from '@/screens/Modal/EditMyDiaryListScreen';
import {
  setFetchInfo,
  addDiaries,
  deleteDiary,
} from '@/stores/actions/diaryList';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  diaries: state.rootReducer.diaryList.diaries,
  fetchInfo: state.rootReducer.diaryList.fetchInfo,
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  setFetchInfo,
  addDiaries,
  deleteDiary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditMyDiaryListScreen);
