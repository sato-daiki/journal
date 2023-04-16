import firebase from '../constants/firebase';
import { getRunningDays, getRunningWeeks, getUsePoints } from './diary';

describe('diary #getUsePoints', () => {
  it('英語、600以上', () => {
    const points = getUsePoints(700, 'en');
    expect(points).toBe(20);
  });

  it('英語、600以下', () => {
    const points = getUsePoints(500, 'en');
    expect(points).toBe(10);
  });
});

describe('diary #getRunningDays', () => {
  // it('通常', () => {
  //   const weeks = getRunningWeeks(3, firebase.firestore.Timestamp.now());
  //   expect(weeks).toEqual(4);
  // });
  it('初回', () => {
    const weeks = getRunningDays(0, null);
    expect(weeks).toEqual(1);
  });

  it('今日すでに投稿', () => {
    const weeks = getRunningDays(1, firebase.firestore.Timestamp.now());
    expect(weeks).toEqual(1);
  });
});

describe('diary #getRunningWeeks', () => {
  it('初回', () => {
    const weeks = getRunningWeeks(0, null);
    expect(weeks).toEqual(1);
  });

  it('今週すでに投稿', () => {
    const weeks = getRunningWeeks(1, firebase.firestore.Timestamp.now());
    expect(weeks).toEqual(1);
  });
});
