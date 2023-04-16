import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { maxMain, headerBlack } from '../../../styles/Common';
import { Icon } from '../../../images/web';
import { Hoverable } from '../../atoms';

interface Props {
  onPress?: () => void;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: headerBlack,
  },
  container: {
    width: '100%',
    maxWidth: maxMain,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  icon: {
    width: 30,
    height: 30,
  },
  text: {
    paddingLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

const Header = ({ onPress }: Props) => {
  return (
    <View style={styles.warapper}>
      <View style={styles.container}>
        <Hoverable style={styles.row} onPress={onPress}>
          <Image source={Icon} style={styles.icon} />
          <Text style={styles.text}>Interchao</Text>
        </Hoverable>
      </View>
    </View>
  );
};

export default Header;
