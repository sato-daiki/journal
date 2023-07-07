import { useTheme } from 'react-native-paper';

export const softRed = 'rgba(218,83,83,1)';
export const softRedOpacy = 'rgba(218,83,83,0.3)';
export const yellow = 'rgba(198,155,3,1)';
export const yellowOpacy = 'rgba(198,155,3,0.2)';
export const gray = '#7F7F7F';
export const green = '#27AE60';
export const black = '#2a2a2a';
export const blackInactive = '#2a2a2a';

export const white = '#fff';
export const linkBlue = '#2469BB';
export const borderLight = '#CCCCCC';
export const transparentWhite = 'rgba(255,255,255,0.4)';
export const transparentBlack = 'rgba(62, 62, 62, 0.4)';

const offWhite = '#f6f6f6';
const offBlack = '#424242';
const main = '#2D9CDB';

const commonColor = {
  main,
  secondary: gray,
};

export const lightTheme = {
  dark: false,
  colors: {
    ...commonColor,
    background: white,
    backgroundSetting: offWhite, // settingのバックグランドは通常時雨のとは変える
    option: white, // settingのoption
    backgroundOff: offWhite,
    backgroundTrans: transparentWhite,
    primary: black,
    primaryInactive: transparentBlack,
    switchBackground: borderLight,
    switchThumb: gray,
  },
};

export const darkTheme = {
  dark: true,
  colors: {
    ...commonColor,
    background: black,
    backgroundSetting: black,
    option: offBlack, // settingのoption
    backgroundOff: offBlack,
    backgroundTrans: transparentBlack,
    primary: white,
    primaryInactive: transparentWhite,
    switchBackground: gray,
    switchThumb: white,
  },
};

// MyStatus（checkedはprimary）
export const myStatusColor = {
  draft: gray,
  revised: green,
  yet: gray,
  unread: softRed,
};

export type AppTheme = typeof lightTheme | typeof darkTheme;

export const useAppTheme = () => useTheme<AppTheme>();
