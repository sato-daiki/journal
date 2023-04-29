import React, { useLayoutEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { HeaderButton, LoadingModal, RadioBox } from '@/components/atoms';

import I18n from '@/utils/I18n';
import { fontSizeL, mainColor, primaryColor } from '@/styles/Common';
import {
  CustomTimeInfo,
  FixDay,
  FixTimeInfo,
  ReminderType,
  User,
} from '@/types';
import ReminderSelectTimeFix from '@/components/organisms/ReminderSelectTime/Fix';
import ReminderSelectTimeCustom from '@/components/organisms/ReminderSelectTime/Custom';
import { CheckItem } from '@/components/molecules';
import { ScrollView } from 'react-native-gesture-handler';
import { ReminderSelectTimeOnboardingNavigationProp } from '@/screens/Onboarding/ReminderSelectTimeScreen/ReminderSelectTimeOnboardingScreen';
import { ReminderSelectTimeSettingNavigationProp } from '@/screens/Onboarding/ReminderSelectTimeScreen/ReminderSelectTimeSettingScreen';
import { useReminderSelectTime } from './useReminderSelectTime';
import NotficationReminder from '../NotficationReminder';

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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    paddingTop: 32,
    paddingHorizontal: 16,
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  radioContainer: {
    paddingBottom: 16,
  },
  checkContainer: {
    paddingTop: 16,
    paddingBottom: 32,
  },
  radioBox: {
    marginHorizontal: 8,
    paddingBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
});

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
        <HeaderButton
          title={I18n.t('common.save')}
          color={mainColor}
          onPress={onPressDone}
        />
      ),
    });
  }, [navigation, onPressDone]);

  return (
    <ScrollView style={styles.container}>
      <NotficationReminder />
      <LoadingModal visible={isLoading} />
      <Text style={styles.title}>{I18n.t('reminderSelectTime.title')}</Text>

      <View style={styles.radioContainer}>
        <View style={styles.radioBox}>
          <RadioBox
            textStyle={styles.bold}
            checked={reminderType === 'fix'}
            color={mainColor}
            text={I18n.t('reminderSelectTime.fix')}
            onPress={onPressFix}
          />
        </View>
        <ReminderSelectTimeFix
          disable={reminderType !== 'fix'}
          fixDays={fixDays}
          fixTimeInfo={fixTimeInfo}
          handleTimeStart={handleFixTimeStart}
          handleTimeEnd={handleFixTimeEnd}
          onPressStudyDay={onPressFixStudyDay}
        />
      </View>
      <View style={styles.radioContainer}>
        <View style={styles.radioBox}>
          <RadioBox
            textStyle={styles.bold}
            checked={reminderType === 'custom'}
            color={mainColor}
            text={I18n.t('reminderSelectTime.custom')}
            onPress={onPressCustom}
          />
        </View>
        <ReminderSelectTimeCustom
          disable={reminderType !== 'custom'}
          customTimeInfos={customTimeInfos}
          handleTimeStart={handleCumtomTimeStart}
          handleTimeEnd={handleCumtomTimeEnd}
          onPressStudyDay={onPressCustomStudyDay}
        />
      </View>
      <View style={styles.checkContainer}>
        <Text style={styles.label}>
          {I18n.t('reminderSelectTime.notificationLable')}
        </Text>
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
      </View>
    </ScrollView>
  );
};

export default ReminderSelectTime;
