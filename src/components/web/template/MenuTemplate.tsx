import React, { ReactNode } from 'react';
import { Menu, MenuOptions, MenuTrigger, renderers } from 'react-native-popup-menu';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { HeaderIcon } from '../../atoms';

interface Props {
  children: ReactNode;
}

const styles = StyleSheet.create({
  optionWrapper: {
    width: 200,
    margin: 0,
    padding: 0,
  },
});

const MenuTemplate = ({ children }: Props) => {
  return (
    <Menu
      renderer={renderers.Popover}
      rendererProps={{
        placement: 'bottom',
      }}
    >
      <MenuTrigger
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
        }}
      >
        <HeaderIcon icon='community' name='dots-horizontal' size={28} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionWrapper: styles.optionWrapper,
        }}
      >
        {children}
      </MenuOptions>
    </Menu>
  );
};

export default MenuTemplate;
