import { connect } from 'react-redux';
import DeleteAcountScreen from '../screens/SettingTab/DeleteAcountScreen';
import { signOut } from '../stores/actions/localStatus';

const mapDispatchToProps = {
  signOut,
};

export default connect(null, mapDispatchToProps)(DeleteAcountScreen);
