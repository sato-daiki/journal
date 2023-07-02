import React, { useCallback, useState } from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import * as Speech from 'expo-speech';
import { LongCode } from '@/types';
import I18n from '@/utils/I18n';
import {
  Modal,
  WhiteButton,
  Space,
  SmallButtonWhite,
  Icon,
  AppText,
  AppSwitch,
} from '@/components';
import { useAppTheme } from '@/styles/colors';

interface Props {
  visible: boolean;
  text: string;
  longCode: LongCode;
  onClose: () => void;
}

const ModalSpeech: React.FC<Props> = ({
  visible,
  text,
  longCode,
  onClose,
}: Props) => {
  const theme = useAppTheme();
  const [isSlow, setIsSlow] = useState(false);

  // 再生中のアイコンを制御
  const [playing, setPlaying] = useState(false);
  // 一番最初から再生
  const [initial, setInitial] = useState(true);

  const onDone = useCallback((): void => {
    setPlaying(false);
    setInitial(true);
  }, []);

  const onSpeak = useCallback((): void => {
    const option = {
      language: longCode,
      rate: isSlow ? 0.6 : 1.0,
      onDone,
    };
    Speech.speak(text, option);
    setInitial(false);
    setPlaying(true);
  }, [isSlow, longCode, onDone, text]);

  const onPressClose = useCallback((): void => {
    Speech.stop();
    onClose();
    setPlaying(false);
    setInitial(true);
  }, [onClose]);

  const onPressSpeak = useCallback((): void => {
    if (initial) {
      onSpeak();
    } else {
      Speech.resume();
      setPlaying(true);
    }
  }, [initial, onSpeak]);

  const onPressPause = useCallback((): void => {
    if (Platform.OS === 'ios') {
      Speech.pause();
      setPlaying(false);
    } else {
      // Androidはpauseとresumeをサポートしていない
      Speech.stop();
      setInitial(true);
      setPlaying(false);
    }
  }, []);

  const onPressStart = useCallback((): void => {
    Speech.stop();
    setInitial(true);
    setPlaying(false);
  }, []);

  return (
    <Modal visible={visible}>
      <ScrollView>
        <View style={styles.container}>
          <AppText size='m'>{text}</AppText>
          <Space size={16} />
          {Platform.OS === 'ios' && (
            <SmallButtonWhite
              containerStyle={styles.startContainer}
              color={theme.colors.primary}
              title={I18n.t('myDiary.start')}
              onPress={onPressStart}
            />
          )}
          <Icon
            icon='community'
            name={playing ? 'pause' : 'play'}
            size={48}
            onPress={playing ? onPressPause : onPressSpeak}
          />
          <View style={styles.switchContainer}>
            <AppSwitch
              onValueChange={(): void => setIsSlow(!isSlow)}
              value={isSlow}
              disabled={!initial}
            />
            <AppText size='m' style={styles.switchText}>
              {I18n.t('common.slow')}
            </AppText>
          </View>
          <Space size={32} />
          <WhiteButton title={I18n.t('common.close')} onPress={onPressClose} />
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  startContainer: {
    position: 'absolute',
    left: 16,
    bottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchContainer: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    marginLeft: 8,
  },
});

export default ModalSpeech;
