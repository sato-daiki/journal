import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Language } from '../../../types';
import MenuTemplate from '../template/MenuTemplate';
import { Sns } from '../../molecules';

interface Props {
  nativeLanguage: Language;
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

// スマホ版もある
const TeachDiaryListMenu = ({ nativeLanguage }: Props) => {
  return (
    <MenuTemplate>
      <View style={styles.container}>
        <Sns nativeLanguage={nativeLanguage} />
      </View>
    </MenuTemplate>
  );
};

export default TeachDiaryListMenu;
