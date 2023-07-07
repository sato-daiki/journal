import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Modal, WhiteButton, Space, AppText, Icon } from '@/components';
import I18n from '@/utils/I18n';
import AppSlider from '@/components/atoms/AppSlider';
import { useAppTheme } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

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
  const theme = useAppTheme();
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
                onPress={onPlayPausePressed}
                disabled={!isPlaybackAllowed || isLoading}
              >
                <MaterialCommunityIcons
                  size={moderateScale(56)}
                  color={theme.colors.primary}
                  name={isPlaying ? 'pause' : 'play'}
                />
              </Icon>
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
    maxHeight: height - verticalScale(200),
    paddingVertical: verticalScale(16),
  },
  scrollView: {
    paddingHorizontal: horizontalScale(16),
  },
  mainContainer: {
    paddingHorizontal: horizontalScale(16),
  },
  playButtonContainer: {
    alignItems: 'center',
    height: verticalScale(100),
  },
  timestampText: {
    textAlignVertical: 'center',
  },
});

export default ModalVoice;
