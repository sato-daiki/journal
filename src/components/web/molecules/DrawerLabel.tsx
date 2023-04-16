import React, { useState, ReactNode } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { mainColor, hoverMain, fontSizeM } from '../../../styles/Common';
import { TabIcon } from '../../molecules';
import { HomeBottomParamList } from '../../../navigations/HomeBottomTabNavigator';

interface Props {
  isMaxLayoutChange: boolean;
  tabName: keyof HomeBottomParamList;
  color: string;
  text: string | null;
}

const styles = StyleSheet.create({
  contaierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  text: {
    marginLeft: 12,
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
  hoverRow: {
    backgroundColor: hoverMain,
    borderRadius: 16,
  },
  contaierSolo: {
    marginLeft: 32,
    padding: 10,
  },
  hoverSolo: {
    borderRadius: 24,
    backgroundColor: hoverMain,
  },
});

const DrawerLabel = ({ isMaxLayoutChange, tabName, color, text }: Props) => {
  const [isHover, setIsHover] = useState(false);

  const renderIcon = (): ReactNode => {
    if (tabName === 'MyDiaryTab') {
      return (
        <TabIcon
          name='book-open'
          size={25}
          color={isHover ? mainColor : color}
          badgeMode='myDiary'
        />
      );
    }
    if (tabName === 'TeachDiaryTab') {
      return (
        <MaterialCommunityIcons name='spellcheck' size={25} color={isHover ? mainColor : color} />
      );
    }
    if (tabName === 'MyPageTab') {
      return <MaterialIcons name='person' size={25} color={isHover ? mainColor : color} />;
    }
    return null;
  };

  return isMaxLayoutChange ? (
    <View
      style={[styles.contaierRow, isHover ? styles.hoverRow : undefined]}
      // @ts-ignore
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
    >
      {renderIcon()}
      <Text style={[styles.text, { color: isHover ? mainColor : color }]}>{text}</Text>
    </View>
  ) : (
    <View
      style={[styles.contaierSolo, isHover ? styles.hoverSolo : undefined]}
      // @ts-ignore
      onMouseEnter={(): void => setIsHover(true)}
      onMouseLeave={(): void => setIsHover(false)}
    >
      {renderIcon()}
    </View>
  );
};

export default DrawerLabel;
