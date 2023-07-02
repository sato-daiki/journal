import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import AppText from '../../atoms/AppText';
import { useAppTheme } from '@/styles/colors';

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
      <AppText size='m' color={theme.colors.main}>
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});

export default React.memo(HeaderText);
