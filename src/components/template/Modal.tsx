import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import Modal from 'react-native-modal';
import { Animation, CustomAnimation } from 'react-native-animatable';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  modal: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  padding0: {
    paddingVertical: 8,
  },
  padding32: {
    paddingVertical: 32,
  },
});

interface Props {
  visible: boolean;
  disablePadding?: boolean;
  animationIn?: Animation | CustomAnimation;
  animationOut?: Animation | CustomAnimation;
  children: React.ReactNode;
}

const Modal1: React.FC<Props> = ({
  visible,
  disablePadding,
  animationIn = 'zoomIn',
  animationOut = 'zoomOut',
  children,
}: Props) => {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={visible}
        animationIn={animationIn}
        animationOut={animationOut}
      >
        <View style={styles.modal}>{children}</View>
      </Modal>
    </View>
  );
};

export default Modal1;
