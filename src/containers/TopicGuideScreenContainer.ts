import { connect } from 'react-redux';
import { State } from '@/types/state';
import TopicGuideScreen, { Props } from '@/screens/Modal/TopicGuideScreen';

const mapStateToProps = (state: State): Props => {
  const { user } = state.rootReducer;
  return {
    user,
  };
};

export default connect(mapStateToProps)(TopicGuideScreen);
