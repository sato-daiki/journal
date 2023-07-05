import React, { useMemo } from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import Flag from 'react-native-flags';
import { LongCode } from '@/types';
import {
  getLanguageToolNationalityCode,
  getLanguageToolName,
  getLanguageToolShortName,
} from '@/utils/grammarCheck';
import { Size } from './ModalPicker';
import { AppText } from '../atoms';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  longCode: LongCode;
  size: Size;
}

const CountryNameWithFlag: React.FC<Props> = ({
  containerStyle,
  size,
  longCode,
}) => {
  const nationalityCode = useMemo(() => {
    return getLanguageToolNationalityCode(longCode);
  }, [longCode]);

  const shortName = useMemo(() => {
    return size === 'large'
      ? getLanguageToolName(longCode)
      : getLanguageToolShortName(longCode);
  }, [longCode, size]);

  return (
    <View style={[styles.container, containerStyle]}>
      <Flag code={nationalityCode} size={24} />
      <AppText size='m' style={styles.nationality}>
        {shortName}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nationality: {
    marginLeft: 8,
  },
});

export default React.memo(CountryNameWithFlag);
