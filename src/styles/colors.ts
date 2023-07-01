import { MD3LightTheme, PaperProvider, useTheme } from 'react-native-paper';
const white = '#fff';
const black = '#2a2a2a';
const main = '#2D9CDB';
const linkBlue = '#2469BB';

const commonColor = {
  main: main,
  linkBlue: linkBlue,
};

export const lightTheme = {
  colors: {
    ...commonColor,
    background: white,
    primary: black,
  },
};

export const darkTheme = {
  colors: {
    ...commonColor,
    background: black,
    primary: white,
  },
};

export type AppTheme = typeof lightTheme | typeof darkTheme;

export const useAppTheme = () => useTheme<AppTheme>();
