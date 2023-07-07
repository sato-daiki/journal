import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';

import { State } from '../types/state';
import { editDiary } from '@/stores/actions/diaryList';
import { setUser } from '@/stores/actions/user';
import ViewMyDiaryScreen, { Props } from '@/screens/Modal/ViewMyDiaryScreen';
import { ModalViewMyDiaryStackParamList } from '@/navigations/ModalNavigator';

interface OwnProps {
  route: RouteProp<ModalViewMyDiaryStackParamList, 'ViewMyDiary'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { diaries } = state.rootReducer.diaryList;
  const localStatus = state.rootReducer.localStatus;
  const user = state.rootReducer.user;

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
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMyDiaryScreen);
