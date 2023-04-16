import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { primaryColor, fontSizeM, fontSizeS } from '@/styles/Common';
import { Modal } from '@/components/template';
import { WhiteButton, Space, HoverableIcon } from '@/components/atoms';
import I18n from '@/utils/I18n';

const { height } = Dimensions.get('window');

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
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlign: Platform.OS === 'web' ? 'center' : 'left',
  },
  playButtonContainer: {
    alignItems: 'center',
    height: 100,
  },
  timestampText: {
    color: primaryColor,
    fontSize: fontSizeS,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

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
          <Text style={styles.text}>{text}</Text>
        </ScrollView>
        <View style={styles.mainContainer}>
          <Space size={16} />
          <Slider
            minimumTrackTintColor={primaryColor}
            value={getSeekSliderPosition()}
            onValueChange={onSeekSliderValueChange}
            onSlidingComplete={onSeekSliderSlidingComplete}
            thumbTintColor={primaryColor}
            disabled={!isPlaybackAllowed || isLoading}
          />
          <Text style={styles.timestampText}>{getPlaybackTimestamp()}</Text>
          <Space size={8} />
          <View style={styles.playButtonContainer}>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <HoverableIcon
                disabled={!isPlaybackAllowed || isLoading}
                icon='community'
                name={isPlaying ? 'pause' : 'play'}
                size={56}
                color={primaryColor}
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

export default ModalVoice;
