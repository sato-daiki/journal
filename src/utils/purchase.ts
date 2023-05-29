import { CustomerInfo } from 'react-native-purchases';

export const checkPremium = (customerInfo: CustomerInfo) => {
  if (typeof customerInfo.entitlements.active.Premium !== 'undefined') {
    return true;
  }
};
