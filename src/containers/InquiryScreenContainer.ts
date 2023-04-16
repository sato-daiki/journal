import { connect } from 'react-redux';
import InquiryScreen, { Props } from '../screens/MyPageTab/InquiryScreen';
import { State } from '../types/state';

const mapStateToProps = (state: State): Props => ({
  user: state.rootReducer.user,
});

export default connect(mapStateToProps)(InquiryScreen);
