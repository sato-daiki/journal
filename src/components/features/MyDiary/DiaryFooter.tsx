import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import I18n from '@/utils/I18n';
import { Space, SubmitButton, WhiteButton } from '../../atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LongCode } from '@/types';
import GrayHeader from '../../molecules/GrayHeader';
import { useAppTheme, white } from '@/styles/colors';
import ModalVoice from '../Modal/ModalVoice';

type Props = {
  isPremium?: boolean;
  showSaplingCheck?: boolean;
  hideFooterButton: boolean;
  text: string;
  longCode: LongCode;
  voiceUrl?: string | null;
  onPressRevise?: () => void;
  checkPermissions?: () => Promise<boolean>;
  onPressCheck?: () => void;
  onPressAdReward?: () => void;
  onPressBecome?: () => void;
  goToRecord?: () => void;
};

const DiaryFooter: React.FC<Props> = ({
  isPremium,
  showSaplingCheck,
  hideFooterButton,
  text,
  voiceUrl,
  onPressRevise,
  onPressCheck,
  onPressAdReward,
  onPressBecome,
  checkPermissions,
  goToRecord,
}) => {
  const theme = useAppTheme();
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
    () => <MaterialCommunityIcons size={22} color={white} name='pen' />,
    [],
  );

  const iconSpellcheck = useMemo(
    () => (
      <MaterialCommunityIcons
        size={22}
        color={theme.colors.main}
        name='spellcheck'
      />
    ),
    [theme.colors.main],
  );

  const iconWatch = useMemo(
    () => (
      <MaterialCommunityIcons size={22} color={theme.colors.main} name='play' />
    ),
    [theme.colors.main],
  );

  const iconBecome = useMemo(
    () => (
      <MaterialCommunityIcons size={18} color={theme.colors.main} name='star' />
    ),
    [theme.colors.main],
  );

  const iconHeader = useMemo(
    () => (
      <MaterialCommunityIcons
        size={22}
        color={theme.colors.primary}
        name='account-voice'
      />
    ),
    [theme.colors.primary],
  );

  const iconRecord = useMemo(
    () => (
      <MaterialCommunityIcons
        size={24}
        color={theme.colors.main}
        name='microphone'
      />
    ),
    [theme.colors.main],
  );

  const iconHeadphones = useMemo(
    () => (
      <MaterialCommunityIcons
        size={22}
        color={theme.colors.main}
        name='headphones'
      />
    ),
    [theme.colors.main],
  );

  /* ViewMidiaryの時と、修正後の原文は非表示にする */
  if (hideFooterButton) return null;

  return (
    <>
      <Space size={48} />
      {onPressRevise && (
        <View style={styles.button}>
          <SubmitButton
            icon={iconPen}
            title={I18n.t('myDiary.revise')}
            onPress={onPressRevise}
          />
        </View>
      )}
      {!showSaplingCheck ? (
        <></>
      ) : isPremium ? (
        <View style={styles.button}>
          <WhiteButton
            icon={iconSpellcheck}
            title={I18n.t('myDiary.check')}
            onPress={onPressCheck}
          />
        </View>
      ) : (
        <>
          <Space size={16} />
          {onPressAdReward && (
            <View style={styles.button}>
              <WhiteButton
                containerStyle={{ paddingHorizontal: 16 }}
                icon={iconWatch}
                title={I18n.t('myDiary.adReward')}
                onPress={onPressAdReward}
              />
            </View>
          )}
          {onPressBecome && (
            <View style={styles.button}>
              <WhiteButton
                icon={iconBecome}
                title={I18n.t('myDiary.become')}
                onPress={onPressBecome}
              />
            </View>
          )}
        </>
      )}

      <Space size={24} />
      <GrayHeader icon={iconHeader} title={I18n.t('myDiary.voiceTitle')} />
      <Space size={24} />
      {!!voiceUrl && (
        <View style={styles.button}>
          <WhiteButton
            icon={iconHeadphones}
            title={I18n.t('myDiary.myVoice')}
            onPress={onPressMyVoice}
          />
        </View>
      )}
      {goToRecord && (
        <View style={styles.button}>
          <WhiteButton
            title={I18n.t('myDiary.record')}
            icon={iconRecord}
            onPress={goToRecord}
          />
        </View>
      )}
      <Space size={32} />
      {!!voiceUrl && (
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});

export default DiaryFooter;
