import React, { useCallback, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary, User } from '../../types';
import { Space } from '../atoms';
import DiaryOriginal from './DiaryOriginal';
import { Matches } from '../molecules/Matches';
import firestore from '@react-native-firebase/firestore';

export interface Props {
  diary: Diary;
  user: User;
  editDiary: (objectID: string, diary: Diary) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewShot: {
    paddingTop: 12,
    backgroundColor: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  activityIndicator: {
    marginVertical: 16,
  },
});

/**
 * 日記詳細
 */
const Posted: React.FC<Props> = ({ user, diary, editDiary }) => {
  const viewShotRef = useRef<ViewShot | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPressIgnore = useCallback(async () => {
    if (activeIndex !== null && diary.checkInfo && diary.objectID) {
      const newMatches = diary.checkInfo.matches.filter(
        (_, i) => i !== activeIndex,
      );

      await firestore().doc(`diaries/${diary.objectID}`).update({
        'checkInfo.matches': newMatches,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });

      if (activeIndex >= newMatches.length) {
        setActiveIndex(null);
      }

      editDiary(diary.objectID, {
        ...diary,
        checkInfo: {
          ...diary.checkInfo,
          matches: newMatches,
        },
      });
    }
  }, [activeIndex, diary, editDiary]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <ViewShot
          style={styles.viewShot}
          ref={viewShotRef}
          options={{ format: 'jpg', quality: 0.9 }}
        >
          <DiaryOriginal
            diary={diary}
            user={user}
            title={diary.title}
            text={diary.text}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      {diary.checkInfo && activeIndex !== null && (
        <Matches
          matches={diary.checkInfo.matches}
          onPressIgnore={onPressIgnore}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
    </View>
  );
};

export default Posted;
