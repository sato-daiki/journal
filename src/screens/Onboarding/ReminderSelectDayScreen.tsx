import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import I18n from '@/utils/I18n';
import { CheckItemDay } from '@/components/molecules';
import { Layout } from '@/components/templates';
import { AppText, LoadingModal, Space } from '@/components';
import { getDayName } from '@/utils/time';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import { SettingTabStackParamList } from '@/navigations/SettingTabNavigator';
import DefaultHeaderBack from '@/components/features/Header/DefaultHeaderBack';
import { horizontalScale, verticalScale } from '@/styles/metrics';

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList | SettingTabStackParamList,
  'ReminderSelectDay'
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<OnboardingStackParamList, 'ReminderSelectDay'>;
};

const ReminderSelectDayScreen: React.FC<ScreenType> = ({
  navigation,
  route,
}) => {
  const [loading, setLoading] = useState(false);
  const { checkedDays, onChangeCheckedDays } = useMemo(
    () => route.params,
    [route.params],
  );

  const [sun, setSun] = useState(checkedDays[0].checked);
  const [mon, setMon] = useState(checkedDays[1].checked);
  const [tue, setTue] = useState(checkedDays[2].checked);
  const [wes, setWes] = useState(checkedDays[3].checked);
  const [thu, setThu] = useState(checkedDays[4].checked);
  const [fri, setFri] = useState(checkedDays[5].checked);
  const [sat, setSat] = useState(checkedDays[6].checked);

  const onPressDone = useCallback(() => {
    if (loading) return;
    setLoading(true);
    const newDays = [
      { ...checkedDays[0], checked: sun },
      { ...checkedDays[1], checked: mon },
      { ...checkedDays[2], checked: tue },
      { ...checkedDays[3], checked: wes },
      { ...checkedDays[4], checked: thu },
      { ...checkedDays[5], checked: fri },
      { ...checkedDays[6], checked: sat },
    ];
    onChangeCheckedDays(newDays);
    navigation.goBack();
    setLoading(false);
  }, [
    checkedDays,
    fri,
    loading,
    mon,
    navigation,
    onChangeCheckedDays,
    sat,
    sun,
    thu,
    tue,
    wes,
  ]);

  const onChangedSun = useCallback(() => {
    setSun(!sun);
  }, [sun]);
  const onChangedMon = useCallback(() => {
    setMon(!mon);
  }, [mon]);
  const onChangedTue = useCallback(() => {
    setTue(!tue);
  }, [tue]);
  const onChangedWes = useCallback(() => {
    setWes(!wes);
  }, [wes]);
  const onChangedThu = useCallback(() => {
    setThu(!thu);
  }, [thu]);
  const onChangedFri = useCallback(() => {
    setFri(!fri);
  }, [fri]);
  const onChangedSat = useCallback(() => {
    setSat(!sat);
  }, [sat]);

  const checkItemDayPills = useMemo(() => {
    return {
      sun: {
        day: 0,
        title: getDayName(0),
        checked: sun,
        onPress: onChangedSun,
      },
      mon: {
        day: 1,
        title: getDayName(1),
        checked: mon,
        onPress: onChangedMon,
      },
      tue: {
        day: 2,
        title: getDayName(2),
        checked: tue,
        onPress: onChangedTue,
      },
      wes: {
        day: 3,
        title: getDayName(3),
        checked: wes,
        onPress: onChangedWes,
      },
      thu: {
        day: 4,
        title: getDayName(4),
        checked: thu,
        onPress: onChangedThu,
      },
      fri: {
        day: 5,
        title: getDayName(5),
        checked: fri,
        onPress: onChangedFri,
      },
      sat: {
        day: 6,
        title: getDayName(6),
        checked: sat,
        onPress: onChangedSat,
      },
    };
  }, [
    sun,
    mon,
    tue,
    wes,
    thu,
    fri,
    sat,
    onChangedSun,
    onChangedMon,
    onChangedTue,
    onChangedWes,
    onChangedThu,
    onChangedFri,
    onChangedSat,
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <DefaultHeaderBack onPress={onPressDone} />,
    });
  }, [navigation, onPressDone]);

  return (
    <Layout innerStyle={styles.container}>
      <LoadingModal visible={loading} />
      <AppText size='l' bold style={styles.title}>
        {I18n.t('reminderSelectDay.title')}
      </AppText>
      <Space size={32} />
      <CheckItemDay {...checkItemDayPills.sun} />
      <CheckItemDay {...checkItemDayPills.mon} />
      <CheckItemDay {...checkItemDayPills.tue} />
      <CheckItemDay {...checkItemDayPills.wes} />
      <CheckItemDay {...checkItemDayPills.thu} />
      <CheckItemDay {...checkItemDayPills.fri} />
      <CheckItemDay {...checkItemDayPills.sat} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(32),
  },
  title: {
    paddingHorizontal: horizontalScale(16),
  },
});

export default ReminderSelectDayScreen;
