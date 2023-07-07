import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppText from './AppText';
import { Icon } from '../templates';

interface Props {
  text: string;
  backgroundColor: string;
  color: string;
  visible: boolean | undefined;
  onPressClose: () => void;
}

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
      <AppText style={styles.text} size='m' color={color}>
        {text}
      </AppText>
      <View style={styles.icon}>
        <Icon onPress={onPressClose}>
          <MaterialCommunityIcons
            name='close-circle-outline'
            size={32}
            color={color}
          />
        </Icon>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingVertical: 16,
    flex: 1,
  },
  text: {
    flex: 1,
  },
  icon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(Note);
