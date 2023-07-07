import React, { ReactNode } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import { useAppTheme } from '@/styles/colors';
import AppText from './AppText';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  isLoading?: boolean;
  disable?: boolean;
  title: string;
  onPress?: () => void;
}

const WhiteButton: React.FC<Props> = ({
  isLoading = false,
  disable = false,
  title,
  icon,
  onPress,
  containerStyle,
  textStyle,
}: Props) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.contaner,
        { borderColor: theme.colors.main },
        containerStyle,
      ]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size='small' />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <AppText size='m' bold color={theme.colors.main} style={textStyle}>
            {title}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaner: {
    flexDirection: 'row',
    borderRadius: 22,
    borderWidth: 1,
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  icon: {
    marginRight: 6,
  },
});

export default React.memo(WhiteButton);
