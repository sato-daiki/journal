export type MyDiaryListView = 'list' | 'calendar';

export interface LocalStatus {
  isLoading: boolean;
  hasPasscode: boolean;
  showCheckPasscode: boolean;
  isLoadingPasscode: boolean;
  isPremium: boolean;
  onboarding?: boolean | null;
  firstLogin: boolean;
  myDiaryListView: MyDiaryListView;
  uid: string | null;
}
