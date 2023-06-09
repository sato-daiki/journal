import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNModal from 'react-native-modal';
import { Animation, CustomAnimation } from 'react-native-animatable';
import { useAppTheme } from '@/styles/colors';
import { moderateScale, verticalScale } from '@/styles/metrics';

interface Props {
  visible: boolean;
  animationIn?: Animation | CustomAnimation;
  animationOut?: Animation | CustomAnimation;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({
  visible,
  animationIn = 'zoomIn',
  animationOut = 'zoomOut',
  children,
}: Props) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <RNModal
        isVisible={visible}
        animationIn={animationIn}
        animationOut={animationOut}
      >
        <View
          style={[styles.modal, { backgroundColor: theme.colors.background }]}
        >
          {children}
        </View>
      </RNModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  modal: {
    width: '100%',
    borderRadius: moderateScale(8),
  },
  padding32: {
    paddingVertical: verticalScale(32),
  },
});

export default Modal;
