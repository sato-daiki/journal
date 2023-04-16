import { connect } from 'react-redux';
import SelectLanguageScreen, {
  Props,
} from '@/screens/Auth/SelectLanguageScreen';
import { setUser } from '@/stores/actions/user';
import { State } from '@/types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

const mapDispatchToProps = {
  setUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SelectLanguageScreen);
