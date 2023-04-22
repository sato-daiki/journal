import { connect } from 'react-redux';
import MyDiaryListScreen, {
  Props,
} from '@/screens/MyDiaryTab/MyDiaryListScreen/MyDiaryListScreen';
import { setMyDiaryListView } from '@/stores/actions/localStatus';
import { setUser } from '@/stores/actions/user';
import { State } from '@/types/state';
import {
  setDiaries,
  addDiaries,
  setDiaryTotalNum,
  editDiary,
  deleteDiary,
  setFetchInfo,
} from '@/stores/actions/diaryList';

const mapStateToProps = (state: State): Props => {
  const { diaries, diaryTotalNum, fetchInfo } = state.rootReducer.diaryList;
  return {
    localStatus: state.rootReducer.localStatus,
    user: state.rootReducer.user,
    diaries,
    diaryTotalNum,
    fetchInfo,
  };
};

const mapDispatchToProps = {
  setMyDiaryListView,
  setUser,
  editDiary,
  deleteDiary,
  setDiaries,
  addDiaries,
  setDiaryTotalNum,
  setFetchInfo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiaryListScreen);
