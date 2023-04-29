import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontSizeM } from '@/styles/Common';
import HoverableIcon from './HoverableIcon';

interface Props {
  text: string;
  backgroundColor: string;
  color: string;
  visible: boolean | undefined;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 16,
  },
  text: {
    flex: 1,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    color: '#fff',
  },
  hoverableIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Note: React.FC<Props> = ({
  text,
  backgroundColor,
  color,
  visible,
  onPressClose,
}) => {
  if (!visible) return null;
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
      <View style={styles.hoverableIcon}>
        <HoverableIcon
          icon='community'
          name='close-circle-outline'
          size={32}
          color={color}
          onPress={onPressClose}
        />
      </View>
    </View>
  );
};

export default React.memo(Note);
