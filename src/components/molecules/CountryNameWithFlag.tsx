import React, { useEffect, useMemo, useState } from 'react';
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
import { horizontalScale } from '@/styles/metrics';
import * as Device from 'expo-device';

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
  const [deviceType, setDeviceType] = useState<Device.DeviceType>();
  useEffect(() => {
    const f = async () => {
      const newDeviceType = await Device.getDeviceTypeAsync();
      setDeviceType(newDeviceType);
    };
    f();
  }, []);
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
      <Flag
        code={nationalityCode}
        size={deviceType === Device.DeviceType.TABLET ? 24 : 16}
      />
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
    marginLeft: horizontalScale(8),
  },
});

export default React.memo(CountryNameWithFlag);
