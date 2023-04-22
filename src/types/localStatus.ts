export type MyDiaryListView = 'list' | 'calendar';

export interface LocalStatus {
  isLoading: boolean;
  onboarding?: boolean | null;
  firstLogin: boolean;
  // localだけで持っている
  myDiaryListView: MyDiaryListView;
  uid: string | null;
}
