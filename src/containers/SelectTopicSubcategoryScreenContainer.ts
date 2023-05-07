import { connect } from 'react-redux';
import SelectTopicSubcategoryScreen, {
  Props,
} from '@/screens/Modal/SelectTopicSubcategoryScreen/SelectTopicSubcategoryScreen';
import { State } from '@/types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

export default connect(mapStateToProps)(SelectTopicSubcategoryScreen);
