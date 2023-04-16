import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { editTeachDiary } from '../stores/actions/teachDiaryList';
import { State } from '../types/state';
import { setUser } from '../stores/actions/user';
import TeachDiaryScreen, { Props } from '../screens/TeachDiaryScreen';
import { TeachDiaryTabStackParamList } from '../navigations/TeachDiaryTabNavigator';

interface OwnProps {
  route: RouteProp<TeachDiaryTabStackParamList, 'TeachDiary'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { user, user } = state.rootReducer;
  const { teachDiaries } = state.rootReducer.teachDiaryList;
  const objectID = ownProps.route.params?.objectID;
  const teachDiary = teachDiaries.find((d) => d.objectID === objectID);
  return {
    user,
    user,
    teachDiary,
  };
};

const mapDispatchToProps = {
  editTeachDiary,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeachDiaryScreen);
