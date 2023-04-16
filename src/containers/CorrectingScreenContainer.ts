import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { setUser } from '../stores/actions/user';
import CorrectingScreen, { Props } from '../screens/CorrectingScreen';
import { State } from '../types/state';
import { editTeachDiary } from '../stores/actions/teachDiaryList';
import { ModalCorrectingStackParamList } from '../navigations/ModalNavigator';

interface OwnProps {
  route: RouteProp<ModalCorrectingStackParamList, 'Correcting'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { user, user } = state.rootReducer;
  const { teachDiaries } = state.rootReducer.teachDiaryList;

  const objectID = ownProps.route.params?.objectID;
  const teachDiary = teachDiaries.find((d) => d.objectID === objectID);

  return {
    user,
    currentProfile: user,
    teachDiary,
  };
};

const mapDispatchToProps = {
  setUser,
  editTeachDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(CorrectingScreen);
