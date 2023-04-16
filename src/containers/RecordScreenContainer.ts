import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { editDiary } from '../stores/actions/diaryList';
import { State } from '../types/state';
import { ModalRecordStackParamList } from '../navigations/ModalNavigator';
import RecordScreen, { Props } from '@/screens/Modal/RecordScreen';

interface OwnProps {
  route: RouteProp<ModalRecordStackParamList, 'Record'>;
}

const mapStateToProps = (state: State, ownProps: OwnProps): Props => {
  const { diaries } = state.rootReducer.diaryList;
  const objectID = ownProps.route.params?.objectID;
  const diary = diaries.find((d) => d.objectID === objectID);

  const { user } = state.rootReducer;
  return {
    diary,
    user,
  };
};

const mapDispatchToProps = {
  editDiary,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordScreen);
