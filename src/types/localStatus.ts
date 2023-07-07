export type MyDiaryListView = 'list' | 'calendar';

export type DarkMode = 'device' | 'dark' | 'light';
export type ThemeColor = 'default' | 'dim';

export interface LocalStatus {
  isLoading: boolean;
  hasPasscode: boolean;
  showCheckPasscode: boolean;
  isLoadingPasscode: boolean;
  isPremium: boolean;
  onboarding?: boolean | null;
  firstLogin: boolean;
  myDiaryListView: MyDiaryListView;
  darkMode?: DarkMode;
  themeColor?: ThemeColor;
  uid: string | null;
}
