import React, { useEffect } from 'react';
import { StyleSheet, Keyboard, View, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { mainColor } from '../../styles/Common';
import { Hoverable, KeyboardSpacer } from '../atoms';

interface Props {
  isKeyboard: boolean;
  setIsKeyboard: (isKeyboard: boolean) => void;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 2,
    zIndex: 10,
    right: 0,
  },
  keyboard: {
    width: 40,
    alignItems: 'center',
  },
});

const KeyboardHideButton: React.FC<Props> = ({ isKeyboard, setIsKeyboard }) => {
  useEffect(() => {
    // androidはwillShowをサポートしていない。 willじゃないと遅いのでiosのみwillにする
    // hideはTextInputの方で管理しているから親から降りてくる
    const keyboardShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboard(true);
      },
    );

    return (): void => {
      keyboardShowListener.remove();
    };
  }, [setIsKeyboard]);

  return (
    <View style={styles.container}>
      {isKeyboard ? (
        <Hoverable style={styles.keyboard} onPress={Keyboard.dismiss}>
          <MaterialCommunityIcons size={24} color={mainColor} name='keyboard-close' />
        </Hoverable>
      ) : null}
      {Platform.OS === 'ios' ? <KeyboardSpacer /> : null}
    </View>
  );
};

export default KeyboardHideButton;
