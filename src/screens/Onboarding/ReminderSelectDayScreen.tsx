import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import I18n from '@/utils/I18n';
import { fontSizeL, primaryColor } from '@/styles/Common';
import { CheckItemDay } from '@/components/molecules';
import { HeaderText, LoadingModal } from '@/components/atoms';
import { getDayName } from '@/utils/time';
import { RouteProp } from '@react-navigation/native';
import { OnboardingStackParamList } from '@/navigations/OnboardingNavigator';
import { MyPageTabStackParamList } from '@/navigations/MyPageTabNavigator';

type NavigationProp = StackNavigationProp<
  OnboardingStackParamList | MyPageTabStackParamList,
  'ReminderSelectDay'
>;

type ScreenType = {
  navigation: NavigationProp;
  route: RouteProp<OnboardingStackParamList, 'ReminderSelectDay'>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    paddingTop: 32,
    paddingHorizontal: 16,
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});

const ReminderSelectDayScreen: React.FC<ScreenType> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const { checkedDays, onChangeCheckedDays } = useMemo(() => route.params, [route.params]);

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
  }, [checkedDays, fri, loading, mon, navigation, onChangeCheckedDays, sat, sun, thu, tue, wes]);

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
      headerRight: () => <HeaderText text={I18n.t('common.done')} onPress={onPressDone} />,
    });
  }, [navigation, onPressDone]);

  return (
    <View style={styles.container}>
      <LoadingModal visible={loading} />
      <Text style={styles.title}>{I18n.t('reminderSelectDay.title')}</Text>
      <CheckItemDay {...checkItemDayPills.sun} />
      <CheckItemDay {...checkItemDayPills.mon} />
      <CheckItemDay {...checkItemDayPills.tue} />
      <CheckItemDay {...checkItemDayPills.wes} />
      <CheckItemDay {...checkItemDayPills.thu} />
      <CheckItemDay {...checkItemDayPills.fri} />
      <CheckItemDay {...checkItemDayPills.sat} />
    </View>
  );
};

export default ReminderSelectDayScreen;
