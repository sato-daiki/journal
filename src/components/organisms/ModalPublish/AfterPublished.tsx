import React from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import { Note } from '@/images';
import { primaryColor, fontSizeL, borderLightColor, fontSizeM } from '@/styles/Common';
import { WhiteButton, Space, Lottie } from '@/components/atoms';
import I18n from '@/utils/I18n';

interface Props {
  publishMessage: string | null;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSizeL,
    color: primaryColor,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
    backgroundColor: 'white',
  },
  line: {
    paddingHorizontal: 16,
    width: '100%',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    marginBottom: 24,
  },
  text: {
    fontSize: fontSizeM,
    color: primaryColor,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: fontSizeM * 1.3,
  },
  img: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
  },
  lottieViewWrapper: {
    height: 100,
  },
  lottieView: {
    position: 'absolute',
    height: 180,
    top: -15,
    alignSelf: 'center',
  },
  lottieViewWebWrapper: {
    height: 82,
  },
  lottieViewWeb: {
    position: 'absolute',
    height: 180,
    top: -60,
    alignSelf: 'center',
  },
  note: {
    alignSelf: 'center',
    width: 160,
    height: 160,
  },
});

const AfterPublished: React.FC<Props> = ({ publishMessage, onPressClose }: Props) => {
  return (
    <>
      <Text style={styles.title}>{I18n.t('modalAlertPublish.publish')}</Text>
      <View>
        <View style={styles.line} />
        {/* androidがLottie対応していないため */}
        {Platform.OS === 'android' ? (
          <>
            <Image style={styles.note} source={Note} />
            <Space size={32} />
          </>
        ) : (
          <View
            style={Platform.OS === 'web' ? styles.lottieViewWebWrapper : styles.lottieViewWrapper}
          >
            <Lottie
              style={Platform.OS === 'web' ? styles.lottieViewWeb : styles.lottieView}
              // eslint-disable-next-line global-require
              source={require('../../../animations/taking-notes.json')}
              autoPlay
              loop={false}
            />
          </View>
        )}
      </View>
      <View>
        <Text style={styles.text}>{publishMessage}</Text>
      </View>
      <Space size={16} />
      <WhiteButton title={I18n.t('common.close')} onPress={onPressClose} />
    </>
  );
};

export default AfterPublished;
