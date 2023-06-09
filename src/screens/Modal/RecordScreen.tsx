import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { logAnalytics } from '@/utils/Analytics';
import { Icon, Layout } from '@/components/templates';
import {
  AppSlider,
  AppText,
  LoadingModal,
  SmallButtonWhite,
  Space,
} from '@/components';
import { Diary, User } from '@/types';
import I18n from '@/utils/I18n';
import {
  ModalRecordStackParamList,
  ModaRecordStackNavigationProp,
} from '@/navigations/ModalNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { deleteStorageAsync, uploadStorageAsync } from '@/utils/storage';
import firestore from '@react-native-firebase/firestore';
import ModalConfirm from '@/components/features/Modal/ModalConfirm';
import HeaderText from '@/components/features/Header/HeaderText';
import DiaryTitleWithPill from '@/components/features/MyDiary/DiaryTitleWithPill';
import DiaryText from '@/components/features/MyDiary/DiaryText';
import { borderLight, softRed, useAppTheme } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

export type Props = {
  diary?: Diary;
  user: User;
};

type DispatchProps = {
  editDiary: (objectID: string, diary: Diary) => void;
};

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalRecordStackParamList, 'Record'>,
  ModaRecordStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
} & Props &
  DispatchProps;

const RecordScreen: React.FC<ScreenType> = ({
  user,
  diary,
  editDiary,
  navigation,
}) => {
  const theme = useAppTheme();

  const recording = useRef<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const isSeeking = useRef<boolean>(false);
  const shouldPlayAtEndOfSeek = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isPlaybackAllowed, setIsPlaybackAllowed] = useState(false);
  const [muted, setMuted] = useState(false);
  const [soundPosition, setSoundPosition] = useState<number | null>(null);
  const [soundDuration, setSoundDuration] = useState<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number | null>(
    null,
  );
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isModaleVoiceDelete, setIsModaleVoiceDelete] = useState(false);
  const [shouldCorrectPitch, setShouldCorrectPitch] = useState(true);
  const [volume, setVolume] = useState(1.0);
  const [rate, setRate] = useState(1.0);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderText
          text={I18n.t('common.close')}
          onPress={(): void => {
            navigation.goBack();
          }}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    return () => {
      const f = async () => {
        if (recording.current !== null) {
          recording.current.setOnRecordingStatusUpdate(null);
          if (isRecording) await recording.current.stopAndUnloadAsync();
          recording.current = null;
        }

        if (sound !== null) {
          sound.setOnPlaybackStatusUpdate(null);
          await sound.unloadAsync();
          setSound(null);
        }
      };
      f();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateScreenForSoundStatus = useCallback((status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      setSoundDuration(status.durationMillis ?? null);
      setSoundPosition(status.positionMillis);
      setShouldPlay(status.shouldPlay);
      setIsPlaying(status.isPlaying);
      setRate(status.rate);
      setMuted(status.isMuted);
      setVolume(status.volume);
      setShouldCorrectPitch(status.shouldCorrectPitch);
      setIsPlaybackAllowed(true);
    } else {
      setSoundDuration(null);
      setSoundPosition(null);
      setIsPlaybackAllowed(false);
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  }, []);

  const stopRecordingAndEnablePlayback =
    useCallback(async (): Promise<void> => {
      if (!recording.current) {
        return;
      }
      setIsLoading(true);
      try {
        await recording.current.stopAndUnloadAsync();
      } catch (error: any) {
        // On Android, calling stop before any data has been collected results in
        // an EAUDIONODATA error. This means no audio data has been written to
        // the output file is invalid.
        if (error.code === 'EAUDIONODATA') {
          console.log(
            `Stop was called too quickly, no data has yet been received (${error.message})`,
          );
        } else {
          console.log('STOP ERROR: ', error.code, error.name, error.message);
        }
        setIsLoading(false);
        return;
      }
      const info = await FileSystem.getInfoAsync(
        recording.current.getURI() || '',
      );
      console.log(`FILE INFO: ${JSON.stringify(info)}`);
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { sound: newSound } =
        await recording.current.createNewLoadedSoundAsync(
          {
            isLooping: false,
            isMuted: muted,
            volume,
            rate,
            shouldCorrectPitch,
          },
          updateScreenForSoundStatus,
        );

      setSound(newSound);
      setIsLoading(false);
    }, [muted, rate, shouldCorrectPitch, updateScreenForSoundStatus, volume]);

  const updateScreenForRecordingStatus = useCallback(
    (status: Audio.RecordingStatus): void => {
      if (status.canRecord) {
        setIsRecording(status.isRecording);
        setRecordingDuration(status.durationMillis);
      } else if (status.isDoneRecording) {
        setIsRecording(false);
        setRecordingDuration(status.durationMillis);
        if (!isLoading) {
          stopRecordingAndEnablePlayback();
        }
      }
    },
    [isLoading, stopRecordingAndEnablePlayback],
  );

  const stopPlaybackAndBeginRecording = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    if (sound !== null) {
      await sound.unloadAsync();
      sound.setOnPlaybackStatusUpdate(null);
      setSound(null);
    }
    await Audio.requestPermissionsAsync();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    if (recording.current !== null) {
      console.log('stopPlaybackAndBeginRecording 2');

      recording.current.setOnRecordingStatusUpdate(null);
      recording.current = null;
    }

    const newRecording = new Audio.Recording();
    await newRecording.prepareToRecordAsync({
      android: {
        extension: '.m4a',
        outputFormat: Audio.AndroidOutputFormat.MPEG_4,
        audioEncoder: Audio.AndroidAudioEncoder.AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      },
      ios: {
        extension: '.m4a',
        outputFormat: Audio.IOSOutputFormat.MPEG4AAC,
        audioQuality: Audio.IOSAudioQuality.MAX,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
      web: {},
    });
    newRecording.setOnRecordingStatusUpdate(updateScreenForRecordingStatus);

    recording.current = newRecording;
    await recording.current.startAsync(); // Will call updateScreenForRecordingStatus.current to update the screen.
    setIsLoading(false);
  }, [sound, updateScreenForRecordingStatus]);

  const onRecordPressed = useCallback((): void => {
    if (isRecording) {
      stopRecordingAndEnablePlayback();
    } else {
      logAnalytics('on_record_pressed_begin');
      stopPlaybackAndBeginRecording();
    }
  }, [
    isRecording,
    stopPlaybackAndBeginRecording,
    stopRecordingAndEnablePlayback,
  ]);

  const seekSliderPosition = useMemo((): number => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return soundPosition / soundDuration;
    }
    return 0;
  }, [sound, soundDuration, soundPosition]);

  const onPlayPausePressed = useCallback(async (): Promise<void> => {
    if (sound != null) {
      if (isPlaying) {
        sound.pauseAsync();
      } else {
        if (seekSliderPosition === 1) {
          await sound.stopAsync();
        }
        sound.playAsync();
      }
    }
  }, [seekSliderPosition, isPlaying, sound]);

  const onSeekSliderValueChange = useCallback((): void => {
    if (sound != null && !isSeeking.current) {
      isSeeking.current = true;
      shouldPlayAtEndOfSeek.current = shouldPlay;
      sound.pauseAsync();
    }
  }, [shouldPlay, sound]);

  const onSeekSliderSlidingComplete = useCallback(
    async (value: number): Promise<void> => {
      if (sound != null) {
        isSeeking.current = false;
        const seekPosition = value * (soundDuration || 0);
        if (shouldPlayAtEndOfSeek.current) {
          sound.playFromPositionAsync(seekPosition);
        } else {
          sound.setPositionAsync(seekPosition);
        }
      }
    },
    [sound, soundDuration],
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

  const playbackTimestamp = useMemo((): string => {
    if (sound != null && soundPosition != null && soundDuration != null) {
      return `${getMMSSFromMillis(soundPosition)} / ${getMMSSFromMillis(
        soundDuration,
      )}`;
    }
    return '';
  }, [getMMSSFromMillis, sound, soundDuration, soundPosition]);

  const recordingTimestamp = useMemo((): string => {
    if (recordingDuration != null) {
      return `${getMMSSFromMillis(recordingDuration)}`;
    }
    return `${getMMSSFromMillis(0)}`;
  }, [getMMSSFromMillis, recordingDuration]);

  const onPressSave = useCallback(async (): Promise<void> => {
    if (!recording.current || !diary || !diary.objectID) return;
    if (isLoading || isSaving) return;
    logAnalytics('on_press_save_record');
    setIsSaving(true);
    const info = await FileSystem.getInfoAsync(
      recording.current.getURI() || '',
    );
    if (!info.exists) {
      setIsSaving(false);
    }
    const path = `voices/${user.uid}/${diary.objectID}`;
    const voiceUrl = await uploadStorageAsync(path, info.uri);
    await firestore().doc(`diaries/${diary.objectID}`).update({
      voiceUrl,
      voicePath: path,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    editDiary(diary.objectID, {
      ...diary,
      voiceUrl,
      voicePath: path,
    });
    setIsSaving(false);
    setSaved(true);
  }, [diary, editDiary, isLoading, isSaving, user.uid]);

  const onPressOpenVoiceDelete = useCallback(() => {
    setIsModaleVoiceDelete(true);
  }, []);

  const onPressCloseVoiceDelete = useCallback(() => {
    setIsModaleVoiceDelete(false);
  }, []);

  const onPressVoiceDelete = useCallback(async (): Promise<void> => {
    if (!recording.current || !diary || !diary.objectID) return;
    if (isLoading || isSaving) return;
    logAnalytics('on_press_voice_delete');

    setIsSaving(true);

    if (sound != null) {
      await sound.unloadAsync();
      sound.setOnPlaybackStatusUpdate(null);
      setSound(null);
    }

    await firestore().doc(`diaries/${diary.objectID}`).update({
      voiceUrl: null,
      voicePath: null,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
    if (diary.voicePath) {
      await deleteStorageAsync(diary.voicePath);
    }
    editDiary(diary.objectID, {
      ...diary,
      voiceUrl: null,
      voicePath: null,
    });

    setIsSaving(false);
    setSaved(false);
    setIsModaleVoiceDelete(false);
  }, [diary, editDiary, isLoading, isSaving, sound]);

  if (!diary) return null;

  return (
    <Layout>
      <LoadingModal visible={isLoading} />
      <ModalConfirm
        visible={isModaleVoiceDelete}
        title={I18n.t('common.confirmation')}
        message={I18n.t('record.confirmMessage')}
        mainButtonText='OK'
        onPressMain={onPressVoiceDelete}
        onPressClose={onPressCloseVoiceDelete}
      />
      <ScrollView style={styles.scrollView}>
        <DiaryTitleWithPill
          isTail={false}
          title={diary.reviseTitle || diary.title}
          themeCategory={diary.themeCategory}
          themeSubcategory={diary.themeSubcategory}
        />
        <Space size={16} />
        <DiaryText>{diary.reviseText || diary.text}</DiaryText>
      </ScrollView>
      {sound && (
        <View
          style={[
            styles.playContaier,
            { backgroundColor: theme.colors.backgroundOff },
          ]}
        >
          <AppSlider
            value={seekSliderPosition}
            onValueChange={onSeekSliderValueChange}
            onSlidingComplete={onSeekSliderSlidingComplete}
            disabled={!isPlaybackAllowed || isLoading}
          />
          <AppText size='s' textAlign='center' style={styles.timestampText}>
            {playbackTimestamp}
          </AppText>
          <View style={styles.playButtonContainer}>
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
            {saved ? (
              <SmallButtonWhite
                containerStyle={styles.saveButton}
                isLoading={isSaving}
                color={theme.colors.primary}
                title={I18n.t('record.delete')}
                onPress={onPressOpenVoiceDelete}
              />
            ) : soundDuration && soundDuration / 1000 >= 120 ? (
              <AppText size='s' color={theme.colors.secondary}>
                {I18n.t('record.notSave')}
              </AppText>
            ) : (
              <SmallButtonWhite
                containerStyle={styles.saveButton}
                isLoading={isSaving}
                color={theme.colors.primary}
                title={I18n.t('record.save')}
                onPress={onPressSave}
              />
            )}
          </View>
        </View>
      )}

      <View
        style={[
          styles.recordButtonContainer,
          {
            borderTopColor: borderLight,
            backgroundColor: theme.colors.backgroundOff,
          },
        ]}
      >
        <Icon onPress={onRecordPressed} disabled={isLoading}>
          <MaterialCommunityIcons
            size={moderateScale(64)}
            color={softRed}
            name={isRecording ? 'stop' : 'record'}
          />
        </Icon>
        {isRecording ? (
          <AppText
            size='s'
            textAlign='center'
            style={[styles.timestampText, styles.recordingText]}
          >
            {recordingTimestamp}
          </AppText>
        ) : null}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(12),
  },
  playContaier: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(32),
  },
  playButtonContainer: {
    marginTop: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonContainer: {
    height: verticalScale(70),
    borderTopWidth: moderateScale(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestampText: {
    textAlignVertical: 'center',
  },
  recordingText: {
    position: 'absolute',
    right: horizontalScale(20),
    paddingTop: verticalScale(4),
  },
  saveButton: {
    position: 'absolute',
    right: horizontalScale(5),
    width: horizontalScale(100),
  },
});

export default RecordScreen;
