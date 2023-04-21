import React, { useRef, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary, User, sampleWords } from '../../types';
import { Space } from '../atoms';
import DiaryOriginal from './DiaryOriginal';
import CheckFooter from './CheckFooter';

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
  const [activeId, setActiveId] = useState<number | null>(null);

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
            activeId={activeId}
            setActiveId={setActiveId}
          />
          <Space size={16} />
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      <CheckFooter activeId={activeId} setActiveId={setActiveId} />
    </View>
  );
};

export default Posted;
