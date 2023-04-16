import React from 'react';
import { Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { fontSizeM, mainColor } from '../../styles/Common';
import Hoverable from './Hoverable';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  color: string;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: mainColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  title: {
    color: '#fff',
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const HeaderButton: React.FC<Props> = ({
  containerStyle,
  title,
  color,
  onPress,
}: Props) => {
  if (!title) return null;
  return (
    <Hoverable
      onPress={onPress}
      style={[styles.container, containerStyle, { backgroundColor: color }]}
    >
      <Text style={styles.title}>{title}</Text>
    </Hoverable>
  );
};

export default React.memo(HeaderButton);
