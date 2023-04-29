import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
import I18n from '../../utils/I18n';
import { clipboard } from '../../styles/Common';
import ModalSpeech from '../organisms/ModalSpeech';
import { Language } from '../../types';
import { Hoverable } from '../atoms';

interface Props {
  children: React.ReactNode;
  displayText: string;
  textLanguage?: Language;
  onPressTranslate: () => void;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: clipboard,
    borderRadius: 8,
  },
  menu: {
    flex: 1,
    alignItems: 'center',
    zIndex: 1,
    width: 90,
  },
  menuText: {
    marginTop: 4,
    color: '#fff',
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  menuOptions: {
    backgroundColor: 'transparent',
  },
});

// 補足
// ポーズから再生する時と、最初から再生するときの制御を行ったため、少し複雑になっている
const TextMenu = ({
  children,
  displayText,
  textLanguage,
  onPressTranslate,
}: Props) => {
  const [visibleSpeech, setVisibleSpeech] = useState(false);

  const onPressSpeech = (): void => {
    setVisibleSpeech(true);
  };

  const onPressCopy = (): void => {
    Clipboard.setString(displayText);
  };

  const copyButton = (
    <MenuOption style={[styles.menu, styles.border]} onSelect={onPressCopy}>
      <MaterialCommunityIcons size={20} color='#fff' name='content-copy' />
      <Text style={styles.menuText}>{I18n.t('common.copy')}</Text>
    </MenuOption>
  );

  const translateButton = (
    <MenuOption
      style={[styles.menu, styles.border]}
      onSelect={onPressTranslate}
    >
      <MaterialCommunityIcons size={20} color='#fff' name='translate' />
      <Text style={styles.menuText}>{I18n.t('common.translation')}</Text>
    </MenuOption>
  );

  const speechButton = (
    <MenuOption style={styles.menu} onSelect={onPressSpeech}>
      <MaterialCommunityIcons size={20} color='#fff' name='volume-high' />
      <Text style={styles.menuText}>{I18n.t('common.speech')}</Text>
    </MenuOption>
  );

  // AndroidのMenuOptionのonSlectが機能しない為
  const renderMenuButton = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.row}>
          {copyButton}
          {translateButton}
          {speechButton}
        </View>
      );
    }
    return (
      <View style={styles.row}>
        <Hoverable onPress={onPressCopy}>{copyButton}</Hoverable>
        <Hoverable onPress={onPressTranslate}>{translateButton}</Hoverable>
        <Hoverable onPress={onPressSpeech}>{speechButton}</Hoverable>
      </View>
    );
  };

  return (
    <View>
      <ModalSpeech
        visible={visibleSpeech}
        text={displayText}
        textLanguage={textLanguage}
        onClose={(): void => setVisibleSpeech(false)}
      />
      <Menu
        renderer={renderers.Popover}
        rendererProps={{
          preferredPlacement: 'top',
          placement: 'auto',
          anchorStyle: { backgroundColor: clipboard },
        }}
      >
        <MenuTrigger triggerOnLongPress>{children}</MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.menuOptions}>
          {renderMenuButton()}
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default TextMenu;
