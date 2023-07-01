import { MD3LightTheme, PaperProvider, useTheme } from 'react-native-paper';
const white = '#fff';
const offWhite = '#f6f6f6';
const black = '#2a2a2a';
const offBlack = '#424242';
const main = '#2D9CDB';
const linkBlue = '#2469BB';
const secondary = '#7F7F7F';
const red = 'rgba(218,83,83,1)';

const commonColor = {
  main,
  linkBlue,
  secondary,
  danger: red,
};

export const lightTheme = {
  colors: {
    ...commonColor,
    background: white,
    backgroundOff: offWhite,
    primary: black,
  },
};

export const darkTheme = {
  colors: {
    ...commonColor,
    background: black,
    backgroundOff: offBlack,
    primary: white,
  },
};

export type AppTheme = typeof lightTheme | typeof darkTheme;

export const useAppTheme = () => useTheme<AppTheme>();
