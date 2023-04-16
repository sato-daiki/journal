import { connect } from 'react-redux';
import { State } from '@/types/state';
import ThemeGuideScreen, { Props } from '@/screens/Modal/ThemeGuideScreen';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;
  return {
    user,
  };
};

export default connect(mapStateToProps)(ThemeGuideScreen);
