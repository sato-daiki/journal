import moment, { DurationInputArg1, DurationInputArg2 } from 'moment';
import 'moment/locale/ja';
import I18n from '@/utils/I18n';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export const getDay = (timestamp: Date, format = 'Y-M-D'): string => {
  if (!timestamp) {
    return '';
  }
  return moment(timestamp).format(format);
};

export const getTime = (date: Date | undefined): string => {
  if (!date) {
    return '';
  }
  return moment(date).format('HH:mm');
};

export const getDayName = (day: number): string => {
  switch (day) {
    case 0:
      return I18n.t('day.sunday');
    case 1:
      return I18n.t('day.monday');
    case 2:
      return I18n.t('day.tuesday');
    case 3:
      return I18n.t('day.wednesday');
    case 4:
      return I18n.t('day.thursday');
    case 5:
      return I18n.t('day.friday');
    case 6:
      return I18n.t('day.saturday');
    default:
      return '';
  }
};

export const getShortDayName = (day: number | undefined): string => {
  switch (day) {
    case 0:
      return I18n.t('shortDay.sunday');
    case 1:
      return I18n.t('shortDay.monday');
    case 2:
      return I18n.t('shortDay.tuesday');
    case 3:
      return I18n.t('shortDay.wednesday');
    case 4:
      return I18n.t('shortDay.thursday');
    case 5:
      return I18n.t('shortDay.friday');
    case 6:
      return I18n.t('shortDay.saturday');
    default:
      return '';
  }
};

export const getDate = (timestamp: any): string => {
  if (!timestamp) {
    return '';
  }
  // eslint-disable-next-line no-underscore-dangle
  if (!timestamp._seconds) {
    return moment.unix(timestamp.seconds).format('Y-M-D HH:mm');
  }
  // eslint-disable-next-line no-underscore-dangle
  return moment.unix(timestamp._seconds).format('Y-M-D HH:mm');
};

export const getShortDaysName = (days: (number | undefined)[]): string => {
  let text = '';
  days.forEach((day) => {
    text += `${getShortDayName(day)}、`;
  });
  return text.slice(0, -1);
};

export const addDay = (
  day: Date,
  num: DurationInputArg1,
  unit: DurationInputArg2,
): Date => {
  return moment(day).add(num, unit).toDate();
};

export const checWithinkHourDiff = (
  date: FirebaseFirestoreTypes.Timestamp | null,
  hour: number,
): boolean => {
  if (!date) return true;
  const dateTo = moment(new Date());
  const dateFrom = moment(date.toDate());
  const diffTime = dateTo.diff(dateFrom, 'hours');
  if (diffTime > hour) {
    return false;
  }
  return true;
};

export const getActiveHour = (
  date: any | null,
  hour: number,
): string | null => {
  if (!date) return null;
  return moment(date.toDate()).add(hour, 'hour').format('HH:mm');
};
