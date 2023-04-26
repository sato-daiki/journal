import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import MyDiaryScreen, { Props } from '../screens/MyDiaryTab/MyDiaryScreen';
import { State } from '../types/state';
import { deleteDiary, editDiary } from '../stores/actions/diaryList';
import { MyDiaryTabStackParamList } from '../navigations/MyDiaryTabNavigator';

interface OwnProps {
  route: RouteProp<MyDiaryTabStackParamList, 'MyDiary'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { diaries } = state.rootReducer.diaryList;
  const { user } = state.rootReducer;

  const objectID = ownProps.route.params?.objectID;
  const diary = diaries.find((d) => d.objectID === objectID);
  return {
    diary,
    user,
  };
};

const mapDispatchToProps = {
  editDiary,
  deleteDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiaryScreen);
