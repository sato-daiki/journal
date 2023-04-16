import { connect } from 'react-redux';
import { setTeachDiaries } from '../stores/actions/teachDiaryList';
import { setUser } from '../stores/actions/user';
import { State } from '../types/state';
import TeachDiaryListScreen, { Props } from '../screens/TeachDiaryListScreen';

const mapStateToProps = (state: State): Props => {
  const { teachDiaries } = state.rootReducer.teachDiaryList;
  return {
    user: state.rootReducer.user,
    user: state.rootReducer.user,
    teachDiaries,
  };
};

const mapDispatchToProps = {
  setTeachDiaries,
  setUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeachDiaryListScreen);
