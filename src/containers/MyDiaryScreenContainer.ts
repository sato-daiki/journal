import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import MyDiaryScreen, { Props } from '../screens/MyDiaryTab/MyDiaryScreen';
import { State } from '../types/state';
import { deleteDiary, editDiary } from '@/stores/actions/diaryList';
import { setUser } from '@/stores/actions/user';
import { MyDiaryTabStackParamList } from '../navigations/MyDiaryTabNavigator';

interface OwnProps {
  route: RouteProp<MyDiaryTabStackParamList, 'MyDiary'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const user = state.rootReducer.user;
  const localStatus = state.rootReducer.localStatus;
  const { diaries } = state.rootReducer.diaryList;

  const objectID = ownProps.route.params?.objectID;
  const diary = diaries.find((d) => d.objectID === objectID);
  return {
    diary,
    localStatus,
    user,
  };
};

const mapDispatchToProps = {
  editDiary,
  deleteDiary,
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyDiaryScreen);
