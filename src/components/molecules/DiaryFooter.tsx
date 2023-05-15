import React, { useCallback, useMemo, useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import {
  fontSizeS,
  mainColor,
  primaryColor,
  subTextColor,
} from '../../styles/Common';
import I18n from '@/utils/I18n';
import { GrayHeader, Space, SubmitButton, WhiteButton } from '../atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalVoice from '../organisms/ModalVoice';
import { LongCode } from '@/types';

type Props = {
  showAdReward: boolean;
  hideFooterButton: boolean;
  text: string;
  longCode: LongCode;
  voiceUrl?: string | null;
  onPressRevise?: () => void;
  checkPermissions?: () => Promise<boolean>;
  onPressAdReward?: () => void;
  goToRecord?: () => void;
};

const styles = StyleSheet.create({
  textLength: {
    color: subTextColor,
    fontSize: fontSizeS,
    textAlign: 'right',
    paddingHorizontal: 16,
  },
  button: {
    width: 300,
    alignSelf: 'center',
    marginBottom: 16,
  },
});

const DiaryFooter: React.FC<Props> = ({
  showAdReward,
  hideFooterButton,
  text,
  voiceUrl,
  onPressRevise,
  onPressAdReward,
  checkPermissions,
  goToRecord,
}) => {
  const [visibleVoice, setVisibleVoice] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [shouldPlayAtEndOfSeek, setShouldPlayAtEndOfSeek] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(false);

  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const [soundPosition, setSoundPosition] = useState<number | null>(null);
  const [soundDuration, setSoundDuration] = useState<number | null>(null);

  const updateScreenForSoundStatus = useCallback(
    (status: AVPlaybackStatus): void => {
      if (status.isLoaded) {
        setSoundDuration(status.durationMillis ?? null);
        setSoundPosition(status.positionMillis);
        setShouldPlay(status.shouldPlay);
        setIsPlaying(status.isPlaying);
        setIsPlaybackAllowed(true);
      } else {
        setSoundDuration(null);
        setSoundPosition(null);
        setIsPlaybackAllowed(false);
        if (status.error) {
          console.log(`FATAL PLAYER ERROR: ${status.error}`);
        }
      }
    },
    [],
  );

  const onSeekSliderValueChange = useCallback((): void => {
    if (sound != null && !isSeeking) {
      setIsSeeking(true);
      setShouldPlayAtEndOfSeek(shouldPlay);
      sound.pauseAsync();
    }
  }, [isSeeking, shouldPlay, sound]);

  const onSeekSliderSlidingComplete = useCallback(
    async (value: number): Promise<void> => {
      if (sound != null) {
        setIsSeeking(false);
        const seekPosition = value * (soundDuration || 0);
        if (shouldPlayAtEndOfSeek) {
          sound.playFromPositionAsync(seekPosition);
        } else {
          sound.setPositionAsync(seekPosition);
        }
      }
    },
    [shouldPlayAtEndOfSeek, sound, soundDuration],
  );

  const getMMSSFromMillis = useCallback((millis: number): string => {
    const totalSeconds = millis / 1000;
    const seconds = Math.floor(totalSeconds % 60);
    const minutes = Math.floor(totalSeconds / 60);

    const padWithZero = (number: number): string => {
      const string = number.toString();
      if (number < 10) {
        return `0${string}`;
      }
      return string;
    };
    return `${padWithZero(minutes)}:${padWithZero(seconds)}`;
  }, []);

  const getSeekSliderPosition = useCallback((): number => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return soundPosition / soundDuration;
    }
    return 0;
  }, [sound, soundDuration, soundPosition]);

  const getPlaybackTimestamp = useCallback((): string => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return `${getMMSSFromMillis(soundPosition)} / ${getMMSSFromMillis(
        soundDuration,
      )}`;
    }
    return '';
  }, [getMMSSFromMillis, sound, soundDuration, soundPosition]);

  const onPlayPausePressed = useCallback(async (): Promise<void> => {
    if (sound !== null) {
      if (isPlaying) {
        sound.pauseAsync();
      } else {
        if (getSeekSliderPosition() === 1) {
          await sound.stopAsync();
        }
        sound.playAsync();
      }
    }
  }, [getSeekSliderPosition, isPlaying, sound]);

  const onPressClose = useCallback(async (): Promise<void> => {
    if (sound !== null) {
      sound.setOnPlaybackStatusUpdate(null);
      await sound.unloadAsync();
    }
    setVisibleVoice(false);
  }, [sound]);

  const onPressMyVoice = useCallback(async (): Promise<void> => {
    if (!voiceUrl || !checkPermissions) return;
    const res = await checkPermissions();
    if (!res) return;
    setVisibleVoice(true);
    setIsInitialLoading(true);
    const newSound = new Audio.Sound();
    newSound.setOnPlaybackStatusUpdate(updateScreenForSoundStatus);
    await newSound.loadAsync({ uri: voiceUrl });
    setSound(newSound);
    setIsInitialLoading(false);
  }, [checkPermissions, updateScreenForSoundStatus, voiceUrl]);

  const iconPen = useMemo(
    () => <MaterialCommunityIcons size={22} color='#fff' name='pen' />,
    [],
  );

  const iconSpellcheck = useMemo(
    () => (
      <MaterialCommunityIcons size={22} color={mainColor} name='spellcheck' />
    ),
    [],
  );

  const iconHeader = useMemo(
    () => (
      <MaterialCommunityIcons
        size={22}
        color={primaryColor}
        name='account-voice'
      />
    ),
    [],
  );

  const iconRecord = useMemo(
    () => (
      <MaterialCommunityIcons size={24} color={mainColor} name='microphone' />
    ),
    [],
  );

  const iconHeadphones = useMemo(
    () => (
      <MaterialCommunityIcons size={22} color={mainColor} name='headphones' />
    ),
    [],
  );

  return (
    <>
      <Text style={styles.textLength}>
        {I18n.t('postDiaryComponent.textLength')}
        {` ${text.length}`}
      </Text>
      {/* ViewMidiaryの時と、修正後の原文は非表示にする */}
      {!hideFooterButton && (
        <>
          <Space size={24} />
          {onPressRevise && (
            <SubmitButton
              containerStyle={styles.button}
              icon={iconPen}
              title={I18n.t('myDiary.revise')}
              onPress={onPressRevise}
            />
          )}
          {/* saplingでまだチェックされていない時 */}
          {showAdReward && onPressAdReward && (
            <WhiteButton
              containerStyle={styles.button}
              icon={iconSpellcheck}
              title={I18n.t('myDiary.adReward')}
              onPress={onPressAdReward}
            />
          )}
          <Space size={24} />
          <GrayHeader icon={iconHeader} title={I18n.t('myDiary.voiceTitle')} />
          <Space size={24} />
          {voiceUrl && (
            <WhiteButton
              containerStyle={styles.button}
              icon={iconHeadphones}
              title={I18n.t('myDiary.myVoice')}
              onPress={onPressMyVoice}
            />
          )}
          {goToRecord && (
            <WhiteButton
              containerStyle={styles.button}
              title={I18n.t('myDiary.record')}
              icon={iconRecord}
              onPress={goToRecord}
            />
          )}
          <Space size={32} />
        </>
      )}
      {voiceUrl ? (
        <ModalVoice
          visible={visibleVoice}
          text={text}
          isPlaybackAllowed={isPlaybackAllowed}
          isLoading={isInitialLoading}
          isPlaying={isPlaying}
          onSeekSliderValueChange={onSeekSliderValueChange}
          onSeekSliderSlidingComplete={onSeekSliderSlidingComplete}
          getSeekSliderPosition={getSeekSliderPosition}
          getPlaybackTimestamp={getPlaybackTimestamp}
          onPlayPausePressed={onPlayPausePressed}
          onPressClose={onPressClose}
        />
      ) : null}
    </>
  );
};

export default DiaryFooter;
