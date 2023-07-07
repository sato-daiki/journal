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
import { useAppTheme, white } from '@/styles/colors';
import AppText from './AppText';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  icon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  disable?: boolean;
  title: string;
  onPress?: () => void;
}

const SubmitButton: React.FC<Props> = ({
  icon,
  isLoading = false,
  disable = false,
  title,
  onPress,
  containerStyle,
  textStyle,
}: Props) => {
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.contaner,
        { backgroundColor: theme.colors.main },
        containerStyle,
      ]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color={white} />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <AppText size='m' bold color={white} style={textStyle}>
            {title}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 22,
    width: '100%',
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 6,
  },
});

export default React.memo(SubmitButton);
