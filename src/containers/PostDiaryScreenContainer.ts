import { connect } from 'react-redux';
import { State } from '@/types/state';
import { setUser } from '@/stores/actions/user';
import { addDiary } from '@/stores/actions/diaryList';

import { Props } from '@/screens/PostDiaryTab/PostDiaryScreen/interfaces';
import PostDiaryScreen from '@/screens/PostDiaryTab/PostDiaryScreen/PostDiaryScreen';

const mapStateToProps = (state: State): Props => {
  return {
    user: state.rootReducer.user,
  };
};

const mapDispatchToProps = {
  setUser,
  addDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDiaryScreen);
