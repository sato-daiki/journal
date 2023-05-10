import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';

import { State } from '../types/state';
import { editDiary } from '../stores/actions/diaryList';
import ViewMyDiaryScreen, {
  Props,
} from '@/screens/Modal/ViewMyDiaryScreen/ViewMyDiaryScreen';
import { ModalViewMyDiaryStackParamList } from '@/navigations/ModalNavigator';

interface OwnProps {
  route: RouteProp<ModalViewMyDiaryStackParamList, 'ViewMyDiary'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { diaries } = state.rootReducer.diaryList;

  const objectID = ownProps.route.params?.objectID;
  const diary = diaries.find((d) => d.objectID === objectID);
  return {
    diary,
  };
};

const mapDispatchToProps = {
  editDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMyDiaryScreen);
