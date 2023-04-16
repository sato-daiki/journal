import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { MenuOption } from 'react-native-popup-menu';
import { Icon, HoverableView } from '../../atoms';
import { hoverGray, subTextColor, primaryColor, fontSizeM } from '../../../styles/Common';
import { IconType } from '../../atoms/Icon';

interface Props {
  onSelect: () => void;
  icon: IconType;
  name: string;
  iconColor?: string;
  size?: number;
  textColor?: string;
  text: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  hover: {
    backgroundColor: hoverGray,
  },
  text: {
    marginLeft: 12,
    fontSize: fontSizeM,
  },
});

const CustumMenuOption = ({
  onSelect,
  icon,
  name,
  size = 25,
  textColor = primaryColor,
  iconColor = subTextColor,
  text,
}: Props) => {
  return (
    <MenuOption onSelect={onSelect}>
      <HoverableView style={styles.container} hoverStyle={styles.hover}>
        <Icon icon={icon} name={name} size={size} color={iconColor} />
        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      </HoverableView>
    </MenuOption>
  );
};

export default React.memo(CustumMenuOption);
