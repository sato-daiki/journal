import React from 'react';
import { Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import { mainColor, fontSizeM } from '../../styles/Common';
import Hoverable from './Hoverable';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  disable?: boolean;
  color?: string;
  title: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const SmallButtonWhite: React.FC<Props> = ({
  containerStyle,
  isLoading = false,
  disable = false,
  color = mainColor,
  title,
  onPress,
}: Props) => {
  return (
    <Hoverable
      style={[styles.contaner, containerStyle, { borderColor: color }]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size='small' />
      ) : (
        <Text style={[styles.title, { color }]}>{title}</Text>
      )}
    </Hoverable>
  );
};

export default React.memo(SmallButtonWhite);
