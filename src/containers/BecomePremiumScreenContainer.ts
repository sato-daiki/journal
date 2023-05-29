import { connect } from 'react-redux';
import { setIsPremium } from '../stores/actions/localStatus';
import BecomePremiumScreen from '@/screens/Modal/BecomePremiumScreen';

const mapDispatchToProps = {
  setIsPremium,
};

export default connect(null, mapDispatchToProps)(BecomePremiumScreen);
