import { getLastMonday, getThisMonday } from './common';

describe('common #getLastMonday', () => {
  it('土曜日', () => {
    const thisMonday = getLastMonday(new Date('2020-10-17'));
    expect(thisMonday).toEqual('2020105');
  });

  it('日曜日', () => {
    const thisMonday = getLastMonday(new Date('2020-10-18'));
    expect(thisMonday).toEqual('2020105');
  });

  it('月曜日', () => {
    const thisMonday = getLastMonday(new Date('2020-10-19'));
    expect(thisMonday).toEqual('20201012');
  });
});

describe('common #getThisMonday', () => {
  it('土曜日', () => {
    const thisMonday = getThisMonday(new Date('2020-10-17'));
    expect(thisMonday).toEqual('20201012');
  });

  it('日曜日', () => {
    const thisMonday = getThisMonday(new Date('2020-10-18'));
    expect(thisMonday).toEqual('20201012');
  });

  it('月曜日', () => {
    const thisMonday = getThisMonday(new Date('2020-10-19'));
    expect(thisMonday).toEqual('20201019');
  });
});
