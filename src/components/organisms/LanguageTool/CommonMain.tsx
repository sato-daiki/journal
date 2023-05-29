import React, { ReactNode } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary } from '../../../types';
import { Space } from '../../atoms';
import DiaryHeader from '@/components/molecules/DiaryHeader';
import DiaryFooter from '@/components/molecules/DiaryFooter';

export interface Props {
  viewShotRef: React.MutableRefObject<ViewShot | null>;
  isPremium?: boolean;
  showSaplingCheck?: boolean;
  hideFooterButton: boolean;
  diary: Diary;
  text: string;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
  onPressCheck?: () => void;
  onPressAdReward?: () => void;
  onPressBecome?: () => void;
  cardTitle: ReactNode;
  cardText: ReactNode;
  titleAndText: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewShot: {
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  mainContainer: {
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
});

const CommonMain: React.FC<Props> = ({
  viewShotRef,
  isPremium,
  showSaplingCheck,
  hideFooterButton,
  diary,
  text,
  checkPermissions,
  goToRecord,
  onPressRevise,
  onPressCheck,
  onPressAdReward,
  onPressBecome,
  titleAndText,
  cardTitle,
  cardText,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ViewShot
          style={styles.viewShot}
          ref={viewShotRef}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          <View style={styles.mainContainer}>
            <DiaryHeader diary={diary} />
            {titleAndText}
          </View>
          <DiaryFooter
            isPremium={isPremium}
            hideFooterButton={hideFooterButton}
            showSaplingCheck={showSaplingCheck}
            text={text}
            longCode={diary.longCode}
            voiceUrl={diary.voiceUrl}
            checkPermissions={checkPermissions}
            goToRecord={goToRecord}
            onPressRevise={onPressRevise}
            onPressCheck={onPressCheck}
            onPressAdReward={onPressAdReward}
            onPressBecome={onPressBecome}
          />
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      {cardTitle}
      {cardText}
    </View>
  );
};

export default CommonMain;
