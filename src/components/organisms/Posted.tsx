import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary, User, sampleMatches, sampleWords } from '../../types';
import { Space } from '../atoms';
import DiaryOriginal from './DiaryOriginal';
import { Matches } from '../molecules/Matches';

export interface Props {
  diary: Diary;
  user: User;
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
const Posted: React.FC<Props> = ({ user, diary }) => {
  const viewShotRef = useRef<ViewShot | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
            words={sampleWords}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      {activeIndex !== null && (
        <Matches
          matches={sampleMatches}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      )}
    </View>
  );
};

export default Posted;
