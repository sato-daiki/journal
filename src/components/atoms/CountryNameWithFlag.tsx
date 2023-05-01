import React, { useMemo } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';
import Flag from 'react-native-flags';
import { primaryColor, fontSizeM } from '../../styles/Common';
import { LongCode } from '@/types';
import {
  getLanguageToolNationalityCode,
  getLanguageToolName,
  getLanguageToolShortName,
} from '@/utils/grammarCheck';
import { Size } from '../molecules/LanguageModalPicker';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  longCode: LongCode;
  size: Size;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nationality: {
    marginLeft: 8,
    color: primaryColor,
    fontSize: fontSizeM,
  },
});

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
      <Text style={styles.nationality}>{shortName}</Text>
    </View>
  );
};

export default React.memo(CountryNameWithFlag);
