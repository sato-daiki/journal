import React, { ReactNode } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  View,
  TouchableOpacity,
} from 'react-native';
import AppText from './AppText';
import { useAppTheme } from '@/styles/colors';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  icon?: ReactNode;
  isLoading?: boolean;
  disable?: boolean;
  color?: string;
  title: string;
  onPress: () => void;
}

const SmallButtonWhite: React.FC<Props> = ({
  containerStyle,
  icon,
  isLoading = false,
  disable = false,
  color,
  title,
  onPress,
}: Props) => {
  const theme = useAppTheme();
  return (
    <TouchableOpacity
      style={[
        styles.contaner,
        containerStyle,
        { borderColor: color || theme.colors.main },
      ]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size='small' />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <AppText bold size='m' style={{ color: color || theme.colors.main }}>
            {title}
          </AppText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 4,
  },
});

export default React.memo(SmallButtonWhite);
