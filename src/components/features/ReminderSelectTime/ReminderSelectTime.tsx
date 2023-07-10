import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { AppText, LoadingModal, RadioBox, Space } from '@/components';

import I18n from '@/utils/I18n';
import {
  CustomTimeInfo,
  FixDay,
  FixTimeInfo,
  ReminderType,
  User,
} from '@/types';
import ReminderSelectTimeCustom from '@/components/features/ReminderSelectTime/Custom';
import { CheckItem } from '@/components/molecules';
import { ScrollView } from 'react-native-gesture-handler';
import { ReminderSelectTimeOnboardingNavigationProp } from '@/screens/Onboarding/ReminderSelectTimeScreen/ReminderSelectTimeOnboardingScreen';
import { ReminderSelectTimeSettingNavigationProp } from '@/screens/Onboarding/ReminderSelectTimeScreen/ReminderSelectTimeSettingScreen';
import { useReminderSelectTime } from './useReminderSelectTime';
import { useAppTheme } from '@/styles/colors';
import HeaderText from '../Header/HeaderText';
import NotficationReminder from './NotficationReminder';
import Fix from './Fix';
import { horizontalScale } from '@/styles/metrics';

export interface ReminderSelectTimeProps {
  navigation:
    | ReminderSelectTimeOnboardingNavigationProp
    | ReminderSelectTimeSettingNavigationProp;
  defaultReminderType: ReminderType;
  defaultNotificationStart: boolean;
  defaultNotificationEnd: boolean;
  defaultFixDays: FixDay[];
  defaultFixTimeInfo: FixTimeInfo;
  defaultCuctomTimeInfos: CustomTimeInfo[];
  user: User;
  setUser: (user: User) => void;
  gotoReminderSelectDay: (param: object) => void;
  afterSave: () => void;
}

const ReminderSelectTime: React.FC<ReminderSelectTimeProps> = ({
  navigation,
  defaultReminderType,
  defaultNotificationStart,
  defaultNotificationEnd,
  defaultFixDays,
  defaultFixTimeInfo,
  defaultCuctomTimeInfos,
  user,
  setUser,
  gotoReminderSelectDay,
  afterSave,
}) => {
  const theme = useAppTheme();
  const {
    isLoading,
    notificationStart,
    notificationEnd,
    reminderType,
    fixDays,
    fixTimeInfo,
    customTimeInfos,
    handleFixTimeStart,
    handleFixTimeEnd,
    handleCumtomTimeStart,
    handleCumtomTimeEnd,
    onPressDone,
    onPressFix,
    onPressCustom,
    onPressCustomStudyDay,
    onPressFixStudyDay,
    onPressNotificationStart,
    onPressNotificationEnd,
  } = useReminderSelectTime({
    defaultReminderType,
    defaultNotificationStart,
    defaultNotificationEnd,
    defaultFixDays,
    defaultFixTimeInfo,
    defaultCuctomTimeInfos,
    user,
    setUser,
    gotoReminderSelectDay,
    afterSave,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderText text={I18n.t('common.save')} onPress={onPressDone} />
      ),
    });
  }, [navigation, onPressDone, theme.colors.main]);

  return (
    <ScrollView style={styles.container}>
      <NotficationReminder />
      <LoadingModal visible={isLoading} />
      <Space size={32} />
      <AppText size='l' bold style={styles.paddingHorizontal16}>
        {I18n.t('reminderSelectTime.title')}
      </AppText>
      <Space size={32} />
      <View style={styles.paddingHorizontal8}>
        <RadioBox
          textStyle={styles.bold}
          checked={reminderType === 'fix'}
          text={I18n.t('reminderSelectTime.fix')}
          onPress={onPressFix}
        />
      </View>
      <Space size={16} />
      <Fix
        disable={reminderType !== 'fix'}
        fixDays={fixDays}
        fixTimeInfo={fixTimeInfo}
        handleTimeStart={handleFixTimeStart}
        handleTimeEnd={handleFixTimeEnd}
        onPressStudyDay={onPressFixStudyDay}
      />
      <Space size={32} />
      <View style={styles.paddingHorizontal8}>
        <RadioBox
          textStyle={styles.bold}
          checked={reminderType === 'custom'}
          text={I18n.t('reminderSelectTime.custom')}
          onPress={onPressCustom}
        />
      </View>
      <Space size={8} />
      <ReminderSelectTimeCustom
        disable={reminderType !== 'custom'}
        customTimeInfos={customTimeInfos}
        handleTimeStart={handleCumtomTimeStart}
        handleTimeEnd={handleCumtomTimeEnd}
        onPressStudyDay={onPressCustomStudyDay}
      />
      <Space size={32} />
      <AppText size='m' bold style={styles.paddingHorizontal16}>
        {I18n.t('reminderSelectTime.notificationLable')}
      </AppText>
      <Space size={6} />
      <CheckItem
        title={I18n.t('reminderSelectTime.notificationStart')}
        checked={notificationStart}
        onPress={onPressNotificationStart}
      />
      <CheckItem
        title={I18n.t('reminderSelectTime.notificationEnd')}
        checked={notificationEnd}
        onPress={onPressNotificationEnd}
      />
      <Space size={32} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paddingHorizontal16: {
    paddingHorizontal: horizontalScale(16),
  },
  paddingHorizontal8: {
    paddingHorizontal: horizontalScale(8),
  },
  bold: {
    fontWeight: 'bold',
  },
});
export default ReminderSelectTime;
