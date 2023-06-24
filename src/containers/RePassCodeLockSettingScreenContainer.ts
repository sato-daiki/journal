import { connect } from 'react-redux';
import { setHasPasscode } from '@/stores/actions/localStatus';
import RePasscodeLockSettingScreen from '@/screens/MyPageTab/RePasscodeLockSetting';

const mapDispatchToProps = {
  setHasPasscode,
};

export default connect(null, mapDispatchToProps)(RePasscodeLockSettingScreen);
