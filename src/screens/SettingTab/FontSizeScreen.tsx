import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';

import {
  SettingTabStackParamList,
  SettingTabNavigationProp,
} from '../../navigations/SettingTabNavigator';
import I18n from '@/utils/I18n';

import { LocalStatus } from '../../types';
import { Layout } from '@/components/templates';
import { borderLight, useAppTheme } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';
import { AppSlider, AppText, Space } from '@/components';
import {
  DEFAULT_FONT_SIZE,
  MAX_FONT_SIZE,
  MIN_FONT_SIZE,
} from '@/constants/common';
import OptionItemContainer from '@/components/molecules/OptionItem/OptionItemContainer';
import DiaryTitle from '@/components/features/MyDiary/DiaryTitle';
import DiaryText from '@/components/features/MyDiary/DiaryText';

export interface Props {
  localStatus: LocalStatus;
}

interface DispatchProps {
  setFontSize: (fontSize: number) => void;
}

type SettingNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingTabStackParamList, 'FontSize'>,
  SettingTabNavigationProp
>;

type ScreenType = {
  navigation: SettingNavigationProp;
} & DispatchProps &
  Props;

const FontSizeScreen: React.FC<ScreenType> = ({ localStatus, setFontSize }) => {
  const theme = useAppTheme();
  // ローカルで持った方が処理が早くなるため
  const [tempFontSize, setTempFontSize] = useState<number>(
    localStatus.fontSize || DEFAULT_FONT_SIZE,
  );

  const onValueChange = useCallback(
    (value: number) => {
      setTempFontSize(value);
      setFontSize(value);
    },
    [setFontSize],
  );

  return (
    <Layout innerStyle={styles.container}>
      <AppText size='m'>
        {I18n.t('display.dark')}: {tempFontSize}
      </AppText>
      <Space size={8} />
      <AppSlider
        value={tempFontSize}
        minimumValue={MIN_FONT_SIZE}
        maximumValue={MAX_FONT_SIZE}
        step={1}
        onValueChange={onValueChange}
      />
      <Space size={16} />
      <View style={styles.line} />
      <Space size={16} />
      <DiaryTitle style={{ flex: undefined }}>
        フォントサイズ確認用のタイトルです。デフォルトは5です。
      </DiaryTitle>
      <Space size={8} />
      <DiaryText>
        これは本文です。テキストの大きさを調整してください。
        これは本文です。テキストの大きさを調整してください。
      </DiaryText>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(32),
    paddingHorizontal: horizontalScale(16),
  },
  line: {
    borderBottomColor: borderLight,
    borderBottomWidth: moderateScale(1),
    width: '100%',
  },
});

export default FontSizeScreen;
