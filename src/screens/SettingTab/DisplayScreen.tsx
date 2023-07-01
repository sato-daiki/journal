import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import { offWhite } from '../../styles/Common';
import I18n from '../../utils/I18n';
import {
  SettingTabStackParamList,
  SettingTabNavigationProp,
} from '../../navigations/SettingTabNavigator';

import { DarkMode, LocalStatus, ThemeColor, User } from '../../types';
import OptionCheck from '@/components/molecules/OptionCheck';

export interface Props {
  localStatus: LocalStatus;
}

interface DispatchProps {
  setDarkMode: (darkMode: DarkMode) => void;
  setThemeColor: (themeColor: ThemeColor) => void;
}

type SettingNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'Display'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: SettingNavigationProp;
} & DispatchProps &
  Props;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
  },
  contentContainerStyle: {
    paddingTop: 32,
  },
});

type CheckOption = {
  value: DarkMode;
  title: string;
};

const DisplayScreen: React.FC<ScreenType> = ({ localStatus, setDarkMode }) => {
  // ローカルで持った方が処理が早くなるため
  const [tempDarkMode, setTempDarkMode] = useState<DarkMode>(
    localStatus.darkMode || 'device',
  );

  const options = useMemo<CheckOption[]>(
    () => [
      {
        value: 'device',
        title: I18n.t('display.device'),
      },
      {
        value: 'light',
        title: I18n.t('display.light'),
      },
      {
        value: 'dark',
        title: I18n.t('display.dark'),
      },
    ],
    [],
  );

  const onPressItem = useCallback(
    async (value: DarkMode) => {
      setTempDarkMode(value);
      setDarkMode(value);
    },
    [setDarkMode],
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}
    >
      {options.map((option, index) => (
        <OptionCheck
          key={index}
          isBorrderTop={index === 0}
          title={option.title}
          value={option.value === tempDarkMode}
          onPress={() => onPressItem(option.value)}
        />
      ))}
    </ScrollView>
  );
};

export default DisplayScreen;
