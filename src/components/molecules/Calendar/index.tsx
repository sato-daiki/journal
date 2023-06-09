import * as React from 'react';
import { Calendar as RNCalendar, CalendarProps } from 'react-native-calendars';
import { MarkedDates } from 'react-native-calendars/src/types';

// 日本語ロケール有効化
import './localeConfig';

type Props = CalendarProps & {
  markedDates?: MarkedDates;
  markingType?: string;
};

export const Calendar: React.FC<Props> = React.memo(({ ...props }) => (
  <RNCalendar
    {...props}
    // Swipeで月移動できるように
    enableSwipeMonths
  />
));

Calendar.displayName = 'Calendar';
