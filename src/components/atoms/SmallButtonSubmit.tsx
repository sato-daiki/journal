import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import AppText from './AppText';
import { useAppTheme, white } from '@/styles/colors';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  disable?: boolean;
  backgroundColor?: string;
  titleColor?: string;
  title: string;
  onPress: () => void;
}

const SmallButtonSubmit: React.FC<Props> = ({
  containerStyle,
  titleStyle,
  isLoading = false,
  disable = false,
  title,
  onPress,
  backgroundColor,
  titleColor,
}: Props) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      style={[
        styles.contaner,
        containerStyle,
        { backgroundColor: backgroundColor || theme.colors.main },
      ]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color={titleColor || white} />
      ) : (
        <AppText bold size='m' color={titleColor || white} style={titleStyle}>
          {title}
        </AppText>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(SmallButtonSubmit);
