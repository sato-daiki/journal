import React from 'react';
import { StyleSheet, Image, Text } from 'react-native';
import { IconSmall } from '../../../images/web/index';
import { fontSizeL, primaryColor, hoverMain } from '../../../styles/Common';
import { HoverableView } from '../../atoms';

interface Props {
  isMaxLayoutChange: boolean;
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    paddingVertical: 12,
  },
  solo: {
    padding: 10,
    marginLeft: 28,
  },
  text: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  hoverRow: {
    borderRadius: 24,
    backgroundColor: hoverMain,
  },
  hoverSolo: {
    borderRadius: 24,
    backgroundColor: hoverMain,
  },
  icon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    alignSelf: 'center',
  },
});

const DrawerLogo = ({ isMaxLayoutChange }: Props) => {
  return isMaxLayoutChange ? (
    <HoverableView style={styles.row} hoverStyle={styles.hoverRow}>
      <Image source={IconSmall} style={styles.icon} />
      <Text style={styles.text}>Interchao</Text>
    </HoverableView>
  ) : (
    <HoverableView style={styles.solo} hoverStyle={styles.hoverSolo}>
      <Image source={IconSmall} style={[styles.icon]} />
    </HoverableView>
  );
};

export default DrawerLogo;
