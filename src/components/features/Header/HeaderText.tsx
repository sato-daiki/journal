import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../atoms/AppText';
import { useAppTheme } from '@/styles/colors';
import { horizontalScale, verticalScale } from '@/styles/metrics';
import { fontSizeM } from '@/styles/fonts';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  onPress?: () => void;
}

const HeaderText: React.FC<Props> = ({
  containerStyle,
  text,
  onPress,
}: Props) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
    >
      {/* ヘッダーの文字サイズは固定 */}
      <AppText style={styles.text} size='m' color={theme.colors.main}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

// 左右は調整OK、縦はNG
const styles = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(4),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: 6,
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

export default React.memo(HeaderText);
