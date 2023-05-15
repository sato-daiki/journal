import React, { ReactNode } from 'react';
import {
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { mainColor, fontSizeM, maxPartL } from '../../styles/Common';
import Hoverable from './Hoverable';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  icon?: ReactNode;
  textStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  disable?: boolean;
  title: string;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  contaner: {
    borderRadius: 22,
    backgroundColor: mainColor,
    width: '100%',
    maxWidth: maxPartL,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  icon: {
    marginRight: 6,
  },
  title: {
    color: '#fff',
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const SubmitButton: React.FC<Props> = ({
  icon,
  isLoading = false,
  disable = false,
  title,
  onPress,
  containerStyle,
  textStyle,
}: Props) => {
  return (
    <Hoverable
      style={[styles.contaner, containerStyle]}
      activeOpacity={isLoading || disable ? 1 : 0.2}
      onPress={isLoading || disable ? undefined : onPress}
    >
      {isLoading ? (
        <ActivityIndicator size='small' color='#fff' />
      ) : (
        <>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.title, textStyle]}>{title}</Text>
        </>
      )}
    </Hoverable>
  );
};

export default React.memo(SubmitButton);
