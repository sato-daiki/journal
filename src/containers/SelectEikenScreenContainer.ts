import { connect } from 'react-redux';
import SelectEikenScreen, {
  Props,
} from '@/screens/Modal/SelectEikenScreen/SelectEikenScreen';
import { State } from '@/types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

export default connect(mapStateToProps)(SelectEikenScreen);
