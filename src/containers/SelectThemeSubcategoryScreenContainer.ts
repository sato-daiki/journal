import { connect } from 'react-redux';
import SelectThemeSubcategoryScreen, {
  Props,
} from '@/screens/Modal/SelectThemeSubcategoryScreen/SelectThemeSubcategoryScreen';
import { State } from '@/types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
  user: state.rootReducer.user,
});

export default connect(mapStateToProps)(SelectThemeSubcategoryScreen);
