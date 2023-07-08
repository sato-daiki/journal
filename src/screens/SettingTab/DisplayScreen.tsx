import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import I18n from '../../utils/I18n';
import {
  SettingTabStackParamList,
  SettingTabNavigationProp,
} from '../../navigations/SettingTabNavigator';

import { DarkMode, LocalStatus, ThemeColor } from '../../types';
import { Layout } from '@/components/templates';
import OptionItem from '@/components/molecules/OptionItem';
import { useAppTheme } from '@/styles/colors';
import { verticalScale } from '@/styles/metrics';

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

type CheckOption = {
  value: DarkMode;
  title: string;
};

const DisplayScreen: React.FC<ScreenType> = ({ localStatus, setDarkMode }) => {
  const theme = useAppTheme();
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
    <Layout
      style={{ backgroundColor: theme.colors.backgroundSetting }}
      innerStyle={styles.container}
    >
      {options.map((option, index) => (
        <OptionItem
          type='check'
          key={index}
          isBorrderTop={index === 0}
          title={option.title}
          checkValue={option.value === tempDarkMode}
          onPress={() => onPressItem(option.value)}
        />
      ))}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(32),
  },
});

export default DisplayScreen;
