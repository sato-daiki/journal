import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Modal, WhiteButton, Space, Icon, AppText } from '@/components';
import I18n from '@/utils/I18n';
import AppSlider from '@/components/atoms/AppSlider';

const { height } = Dimensions.get('window');

interface Props {
  visible: boolean;
  text: string;
  isPlaybackAllowed: boolean;
  isLoading: boolean;
  isPlaying: boolean;
  onSeekSliderValueChange: () => void;
  onSeekSliderSlidingComplete: (value: number) => Promise<void>;
  getSeekSliderPosition: () => number;
  getPlaybackTimestamp: () => string;
  onPlayPausePressed: () => void;
  onPressClose: () => void;
}

const ModalVoice: React.FC<Props> = ({
  visible,
  text,
  isPlaybackAllowed,
  isLoading,
  isPlaying,
  onSeekSliderValueChange,
  onSeekSliderSlidingComplete,
  getSeekSliderPosition,
  getPlaybackTimestamp,
  onPlayPausePressed,
  onPressClose,
}: Props) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <AppText size='m'>{text}</AppText>
        </ScrollView>
        <View style={styles.mainContainer}>
          <Space size={16} />
          <AppSlider
            value={getSeekSliderPosition()}
            onValueChange={onSeekSliderValueChange}
            onSlidingComplete={onSeekSliderSlidingComplete}
            disabled={!isPlaybackAllowed || isLoading}
          />
          <AppText size='s' textAlign='center' style={styles.timestampText}>
            {getPlaybackTimestamp()}
          </AppText>
          <Space size={8} />
          <View style={styles.playButtonContainer}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Icon
                icon='community'
                name={isPlaying ? 'pause' : 'play'}
                disabled={!isPlaybackAllowed || isLoading}
                size={56}
                onPress={onPlayPausePressed}
              />
            )}
          </View>
          <Space size={32} />
          <WhiteButton title={I18n.t('common.close')} onPress={onPressClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: height - 200,
    paddingVertical: 16,
  },
  scrollView: {
    paddingHorizontal: 16,
  },
  mainContainer: {
    paddingHorizontal: 16,
  },
  playButtonContainer: {
    alignItems: 'center',
    height: 100,
  },
  timestampText: {
    textAlignVertical: 'center',
  },
});

export default ModalVoice;