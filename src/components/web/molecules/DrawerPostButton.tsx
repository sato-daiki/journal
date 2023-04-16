import React from 'react';
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor } from '../../../styles/Common';
import { HoverableView, SubmitButton } from '../../atoms';
import I18n from '../../../utils/I18n';

interface Props {
  isMaxLayoutChange: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  submitButton: {
    width: 200,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: mainColor,
    marginLeft: 32,
  },
});

const DrawerPostButton = ({ isMaxLayoutChange, onPress }: Props) => {
  return isMaxLayoutChange ? (
    <SubmitButton
      containerStyle={styles.submitButton}
      title={I18n.t('mainTab.postDiary')}
      onPress={onPress}
    />
  ) : (
    <HoverableView style={styles.icon}>
      <MaterialCommunityIcons name='pencil' size={25} color='#fff' />
    </HoverableView>
  );
};

export default DrawerPostButton;
