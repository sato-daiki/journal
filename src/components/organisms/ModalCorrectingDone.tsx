import React, { createRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { primaryColor, fontSizeM } from '@/styles/Common';
import { GetPoints, FlashLeft, FlashRight } from '@/images';

import I18n from '@/utils/I18n';
import { Modal } from '@/components/template';
import { Space, UserPointsBig, SubmitButton, Lottie, Heading } from '@/components/atoms';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: fontSizeM,
    color: primaryColor,
    lineHeight: fontSizeM * 1.3,
  },
  lottieView: {
    height: 160,
    alignSelf: 'center',
  },
  getPoints: {
    width: 120,
    height: 120,
  },
  img: {
    position: 'absolute',
    right: Platform.OS === 'web' ? 0 : 20,
    top: 20,
    width: 30,
    height: 30,
  },
  img2: {
    position: 'absolute',
    left: Platform.OS === 'web' ? 0 : 20,
    top: 20,
    width: 30,
    height: 30,
  },
  flashWrapper: {
    position: 'relative',
  },
});

interface Props {
  visible: boolean;
  points: number;
  getPoints: number;
  onPressClose: () => void;
}

const ModalCorrectingDone: React.FC<Props> = ({
  visible,
  points,
  getPoints,
  onPressClose,
}: Props) => {
  const [isShowFlash, setIsShowFlash] = useState(false);
  const refLottie = createRef<Lottie>();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (visible) setIsShowFlash(true);
    }, 2300);

    const timer2 = setTimeout(() => {
      if (visible && refLottie.current) refLottie.current.play();
    }, 500);

    return (): void => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [refLottie, visible]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Heading title={I18n.t('modalCorrectingDone.title')} />
        {Platform.OS === 'android' ? (
          <>
            <Image style={styles.getPoints} source={GetPoints} />
            <Space size={32} />
          </>
        ) : (
          <>
            <View style={styles.flashWrapper}>
              {isShowFlash ? (
                <>
                  <Image style={styles.img} source={FlashLeft} />
                  <Image style={styles.img2} source={FlashRight} />
                </>
              ) : null}
              <Lottie
                ref={refLottie}
                style={styles.lottieView}
                // eslint-disable-next-line global-require
                source={require('../../animations/points-get.json')}
                autoPlay={Platform.OS !== 'web'}
                loop={false}
              />
            </View>
            <Text style={styles.text}>{I18n.t('modalCorrectingDone.text', { getPoints })}</Text>
          </>
        )}
        <Space size={24} />
        <UserPointsBig points={points} />
        <Space size={32} />
        <SubmitButton title={I18n.t('common.close')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default ModalCorrectingDone;
