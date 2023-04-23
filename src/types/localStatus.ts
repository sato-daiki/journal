export type MyDiaryListView = 'list' | 'calendar';

export interface LocalStatus {
  isLoading: boolean;
  onboarding?: boolean | null;
  firstLogin: boolean;
  myDiaryListView: MyDiaryListView;
  uid: string | null;
}
