import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Audio, AVPlaybackStatus } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { logAnalytics } from '@/utils/Analytics';
import {
  HeaderText,
  HoverableIcon,
  LoadingModal,
  SmallButtonWhite,
} from '@/components/atoms';
import { Diary, User } from '@/types';
import I18n from '@/utils/I18n';
import {
  ModalRecordStackParamList,
  ModaRecordStackNavigationProp,
} from '@/navigations/ModalNavigator';
import { DiaryTitleAndText } from '@/components/molecules';
import {
  borderLightColor,
  fontSizeS,
  offWhite,
  primaryColor,
  softRed,
  subTextColor,
} from '@/styles/Common';
import { uploadStorageAsync } from '@/utils/storage';
import firestore from '@react-native-firebase/firestore';
import ModalConfirm from '@/components/organisms/ModalConfirm';

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

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: offWhite,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  playContaier: {
    backgroundColor: offWhite,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  playButtonContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordButtonContainer: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: borderLightColor,
    backgroundColor: offWhite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timestampText: {
    color: primaryColor,
    fontSize: fontSizeS,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  recordingText: {
    position: 'absolute',
    right: 20,
    paddingTop: 4,
  },
  saveButton: {
    position: 'absolute',
    right: 5,
    width: 100,
  },
  notSaveText: {
    fontSize: fontSizeS,
    color: subTextColor,
  },
});

type State = {
  isLoading: boolean;
  isSaving: boolean;
  saved: boolean;
  isPlaybackAllowed: boolean;
  muted: boolean;
  soundPosition: number | null;
  soundDuration: number | null;
  recordingDuration: number | null;
  shouldPlay: boolean;
  isPlaying: boolean;
  isRecording: boolean;
  isModaleVoiceDelete: boolean;
  fontLoaded: boolean;
  shouldCorrectPitch: boolean;
  volume: number;
  rate: number;
};

export default class RecordScreen extends React.Component<ScreenType, State> {
  private recording: Audio.Recording | null;

  private sound: Audio.Sound | null;

  private isSeeking: boolean;

  private shouldPlayAtEndOfSeek: boolean;

  private readonly recordingSettings: Audio.RecordingOptions;

  constructor(props: ScreenType) {
    super(props);
    this.recording = null;
    this.sound = null;
    this.isSeeking = false;
    this.shouldPlayAtEndOfSeek = false;
    this.state = {
      isLoading: false,
      isSaving: false,
      saved: false,
      isPlaybackAllowed: false,
      muted: false,
      soundPosition: null,
      soundDuration: null,
      recordingDuration: null,
      shouldPlay: false,
      isPlaying: false,
      isRecording: false,
      fontLoaded: false,
      isModaleVoiceDelete: false,
      shouldCorrectPitch: true,
      volume: 1.0,
      rate: 1.0,
    };

    //@ts-ignore
    this.recordingSettings = {
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
    };

    // UNCOMMENT THIS TO TEST maxFileSize:
    /* this.recordingSettings = {
      ...this.recordingSettings,
      android: {
        ...this.recordingSettings.android,
        maxFileSize: 12000,
      },
    }; */
  }

  componentDidMount() {
    const { navigation } = this.props;
    (async () => {
      // await Font.loadAsync({
      // eslint-disable-next-line global-require
      // RobotoMono: require('../styles/fonts/RobotoMono-Regular.ttf'),
      // });
      this.setState({ fontLoaded: true });
    })();
    // this.askForPermissions();
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
  }

  async componentWillUnmount() {
    const { isRecording } = this.state;
    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      if (isRecording) await this.recording.stopAndUnloadAsync();
      this.recording = null;
    }

    if (this.sound !== null) {
      this.sound.setOnPlaybackStatusUpdate(null);
      await this.sound.unloadAsync();
      this.sound = null;
    }
  }

  private updateScreenForSoundStatus = (status: AVPlaybackStatus) => {
    if (status.isLoaded) {
      this.setState({
        soundDuration: status.durationMillis ?? null,
        soundPosition: status.positionMillis,
        shouldPlay: status.shouldPlay,
        isPlaying: status.isPlaying,
        rate: status.rate,
        muted: status.isMuted,
        volume: status.volume,
        shouldCorrectPitch: status.shouldCorrectPitch,
        isPlaybackAllowed: true,
      });
    } else {
      this.setState({
        soundDuration: null,
        soundPosition: null,
        isPlaybackAllowed: false,
      });
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  private updateScreenForRecordingStatus = (
    status: Audio.RecordingStatus,
  ): void => {
    const { isLoading } = this.state;
    if (status.canRecord) {
      this.setState({
        isRecording: status.isRecording,
        recordingDuration: status.durationMillis,
      });
    } else if (status.isDoneRecording) {
      this.setState({
        isRecording: false,
        recordingDuration: status.durationMillis,
      });
      if (!isLoading) {
        this.stopRecordingAndEnablePlayback();
      }
    }
  };

  private stopPlaybackAndBeginRecording = async (): Promise<void> => {
    this.setState({
      isLoading: true,
    });
    if (this.sound !== null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }
    await Audio.requestPermissionsAsync();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });

    if (this.recording !== null) {
      this.recording.setOnRecordingStatusUpdate(null);
      this.recording = null;
    }

    const recording = new Audio.Recording();
    await recording.prepareToRecordAsync(this.recordingSettings);
    recording.setOnRecordingStatusUpdate(this.updateScreenForRecordingStatus);

    this.recording = recording;
    await this.recording.startAsync(); // Will call this.updateScreenForRecordingStatus to update the screen.
    this.setState({
      isLoading: false,
    });
  };

  private stopRecordingAndEnablePlayback = async (): Promise<void> => {
    const { muted, volume, rate, shouldCorrectPitch } = this.state;
    this.setState({
      isLoading: true,
    });
    if (!this.recording) {
      return;
    }
    try {
      await this.recording.stopAndUnloadAsync();
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
      this.setState({
        isLoading: false,
      });
      return;
    }
    const info = await FileSystem.getInfoAsync(this.recording.getURI() || '');
    console.log(`FILE INFO: ${JSON.stringify(info)}`);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
    });
    const { sound } = await this.recording.createNewLoadedSoundAsync(
      {
        isLooping: false,
        isMuted: muted,
        volume,
        rate,
        shouldCorrectPitch,
      },
      this.updateScreenForSoundStatus,
    );

    this.sound = sound;
    this.setState({
      isLoading: false,
    });
  };

  private onRecordPressed = (): void => {
    const { isRecording } = this.state;
    if (isRecording) {
      this.stopRecordingAndEnablePlayback();
    } else {
      logAnalytics('on_record_pressed_begin');
      this.stopPlaybackAndBeginRecording();
    }
  };

  private onPlayPausePressed = async (): Promise<void> => {
    const { isPlaying } = this.state;

    if (this.sound != null) {
      if (isPlaying) {
        this.sound.pauseAsync();
      } else {
        if (this.getSeekSliderPosition() === 1) {
          await this.sound.stopAsync();
        }
        this.sound.playAsync();
      }
    }
  };

  private onSeekSliderValueChange = (): void => {
    const { shouldPlay } = this.state;

    if (this.sound != null && !this.isSeeking) {
      this.isSeeking = true;
      this.shouldPlayAtEndOfSeek = shouldPlay;
      this.sound.pauseAsync();
    }
  };

  private onSeekSliderSlidingComplete = async (
    value: number,
  ): Promise<void> => {
    const { soundDuration } = this.state;
    if (this.sound != null) {
      this.isSeeking = false;
      const seekPosition = value * (soundDuration || 0);
      if (this.shouldPlayAtEndOfSeek) {
        this.sound.playFromPositionAsync(seekPosition);
      } else {
        this.sound.setPositionAsync(seekPosition);
      }
    }
  };

  private getSeekSliderPosition = (): number => {
    const { soundPosition, soundDuration } = this.state;
    if (this.sound != null && soundPosition != null && soundDuration != null) {
      return soundPosition / soundDuration;
    }
    return 0;
  };

  private getMMSSFromMillis = (millis: number): string => {
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
  };

  private getPlaybackTimestamp = (): string => {
    const { soundPosition, soundDuration } = this.state;

    if (this.sound != null && soundPosition != null && soundDuration != null) {
      return `${this.getMMSSFromMillis(
        soundPosition,
      )} / ${this.getMMSSFromMillis(soundDuration)}`;
    }
    return '';
  };

  private getRecordingTimestamp = (): string => {
    const { recordingDuration } = this.state;

    if (recordingDuration != null) {
      return `${this.getMMSSFromMillis(recordingDuration)}`;
    }
    return `${this.getMMSSFromMillis(0)}`;
  };

  private onPressSave = async (): Promise<void> => {
    const { isLoading, isSaving } = this.state;
    const { user, diary, editDiary } = this.props;

    if (!this.recording || !diary || !diary.objectID) return;
    if (isLoading || isSaving) return;
    logAnalytics('on_press_save_record');

    this.setState({
      isSaving: true,
    });
    const info = await FileSystem.getInfoAsync(this.recording.getURI() || '');
    if (!info.exists) {
      this.setState({
        isSaving: false,
      });
    }
    const path = `voices/${user.uid}/${diary.objectID}`;
    const voiceUrl = await uploadStorageAsync(path, info.uri);
    await firestore().doc(`diaries/${diary.objectID}`).update({
      voiceUrl,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });

    editDiary(diary.objectID, {
      ...diary,
      voiceUrl,
    });
    this.setState({
      isSaving: false,
      saved: true,
    });
  };

  private onPressVoiceDelete = async (): Promise<void> => {
    const { isLoading, isSaving } = this.state;
    const { diary, editDiary } = this.props;

    if (!this.recording || !diary || !diary.objectID) return;
    if (isLoading || isSaving) return;
    logAnalytics('on_press_voice_delete');

    this.setState({
      isSaving: true,
    });

    if (this.sound != null) {
      await this.sound.unloadAsync();
      this.sound.setOnPlaybackStatusUpdate(null);
      this.sound = null;
    }

    await firestore().doc(`diaries/${diary.objectID}`).update({
      voiceUrl: null,
      updatedAt: firestore.FieldValue.serverTimestamp(),
    });
    editDiary(diary.objectID, {
      ...diary,
      voiceUrl: null,
    });

    this.setState({
      isSaving: false,
      saved: false,
      isModaleVoiceDelete: false,
    });
  };

  render() {
    const {
      isPlaybackAllowed,
      isLoading,
      isRecording,
      isPlaying,
      isSaving,
      saved,
      isModaleVoiceDelete,
      fontLoaded,
      soundDuration,
    } = this.state;
    const { user, diary } = this.props;
    if (!diary) return null;

    const SaveButton = () => {
      if (saved) {
        return (
          <SmallButtonWhite
            containerStyle={styles.saveButton}
            isLoading={isSaving}
            color={primaryColor}
            title={I18n.t('record.delete')}
            onPress={(): void => {
              this.setState({ isModaleVoiceDelete: true });
            }}
          />
        );
      }

      if (soundDuration && soundDuration / 1000 >= 120) {
        return (
          <Text style={styles.notSaveText}>{I18n.t('record.notSave')}</Text>
        );
      }
      return (
        <SmallButtonWhite
          containerStyle={styles.saveButton}
          isLoading={isSaving}
          color={primaryColor}
          title={I18n.t('record.save')}
          onPress={this.onPressSave}
        />
      );
    };

    if (!fontLoaded) {
      return <LoadingModal />;
    }

    return (
      <SafeAreaView style={styles.safeAreaView}>
        <ModalConfirm
          visible={isModaleVoiceDelete}
          title={I18n.t('common.confirmation')}
          message={I18n.t('record.confirmMessage')}
          mainButtonText='OK'
          onPressMain={this.onPressVoiceDelete}
          onPressClose={(): void => {
            this.setState({ isModaleVoiceDelete: false });
          }}
        />
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <DiaryTitleAndText
              title={diary.reviseTitle || diary.title}
              text={diary.reviseText || diary.text}
              themeCategory={diary.themeCategory}
              themeSubcategory={diary.themeSubcategory}
            />
          </ScrollView>
          {this.sound ? (
            <View style={styles.playContaier}>
              <Slider
                minimumTrackTintColor={primaryColor}
                value={this.getSeekSliderPosition()}
                onValueChange={this.onSeekSliderValueChange}
                onSlidingComplete={this.onSeekSliderSlidingComplete}
                thumbTintColor={primaryColor}
                disabled={!isPlaybackAllowed || isLoading}
              />
              <Text style={styles.timestampText}>
                {this.getPlaybackTimestamp()}
              </Text>
              <View style={styles.playButtonContainer}>
                <HoverableIcon
                  disabled={!isPlaybackAllowed || isLoading}
                  icon='community'
                  name={isPlaying ? 'pause' : 'play'}
                  size={56}
                  color={primaryColor}
                  onPress={this.onPlayPausePressed}
                />
                {SaveButton()}
              </View>
            </View>
          ) : null}

          <View style={styles.recordButtonContainer}>
            <HoverableIcon
              disabled={isLoading}
              icon='community'
              name={isRecording ? 'stop' : 'record'}
              size={64}
              color={softRed}
              onPress={this.onRecordPressed}
            />
            {isRecording ? (
              <Text style={[styles.timestampText, styles.recordingText]}>
                {this.getRecordingTimestamp()}
              </Text>
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
