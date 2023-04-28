import React, { useCallback, useMemo, useRef, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { Diary, User, Word } from '../../types';
import { HoverableIcon, Space } from '../atoms';
import DiaryOriginal from './DiaryOriginal';
import firestore from '@react-native-firebase/firestore';
import {
  borderLightColor,
  offWhite,
  primaryColor,
  softRed,
  softRedOpacy,
  yellow,
  yellowOpacy,
} from '@/styles/Common';
import { Matche } from '../molecules/Match';
import { getColors } from '@/utils/spellChecker';

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
  matchContainer: {
    paddingHorizontal: 8,
    backgroundColor: offWhite,
    height: 180,
  },
  header: {
    height: 32,
  },
  iconLeft: {
    position: 'absolute',
    right: 80,
  },
  iconRight: {
    position: 'absolute',
    right: 40,
  },
  iconClose: {
    position: 'absolute',
    right: 0,
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

  const words = useMemo(() => {
    if (!diary.checkInfo) return;

    const { checkInfo, text } = diary;
    const { matches } = checkInfo;

    let currentOffset = 0;
    let index = 0;
    let finish = false;

    let temmWords: Word[] = [];

    while (!finish) {
      if (index < matches.length && currentOffset === matches[index].offset) {
        const matchWard = text.substring(
          currentOffset,
          currentOffset + matches[index].length,
        );
        const { color, backgroundColor } = getColors(matches[index]);
        temmWords.push({
          text: matchWard,
          checked: true,
          checkIndex: index,
          color,
          backgroundColor,
          ignore: false,
        });
        currentOffset = currentOffset + matches[index].length + 1;
        index++;
      }
      const notMatchText = text.substring(
        currentOffset,
        index < matches.length ? matches[index].offset - 1 : text.length,
      );
      const splitTexts = notMatchText.split(' ');
      for (let j = 0; j < splitTexts.length; j++) {
        temmWords.push({
          text: splitTexts[j],
          checked: false,
        });
      }

      if (index < matches.length) {
        currentOffset = matches[index].offset;
      } else {
        finish = true;
      }
    }
    return temmWords;
  }, [diary]);

  const onPressLeft = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex, setActiveIndex]);

  const onPressRight = useCallback(() => {
    if (activeIndex !== null) {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, setActiveIndex]);

  const onPressClose = () => {
    setActiveIndex(null);
  };

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
            words={words}
            user={user}
            title={diary.title}
            text={diary.text}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </ViewShot>
        <Space size={32} />
      </ScrollView>
      {diary.checkInfo && words && activeIndex !== null && (
        <View style={styles.matchContainer}>
          <View style={styles.header}>
            <HoverableIcon
              style={styles.iconLeft}
              icon={'community'}
              name={'arrow-left-thin'}
              size={24}
              color={activeIndex !== 0 ? primaryColor : borderLightColor}
              onPress={activeIndex !== 0 ? onPressLeft : undefined}
            />
            <HoverableIcon
              style={styles.iconRight}
              icon={'community'}
              name={'arrow-right-thin'}
              size={24}
              color={
                activeIndex !== diary.checkInfo.matches.length - 1
                  ? primaryColor
                  : borderLightColor
              }
              onPress={
                activeIndex !== diary.checkInfo.matches.length - 1
                  ? onPressRight
                  : undefined
              }
            />
            <HoverableIcon
              style={styles.iconClose}
              icon='community'
              name='close-circle-outline'
              size={24}
              onPress={onPressClose}
            />
          </View>
          <Matche
            match={diary.checkInfo.matches[activeIndex]}
            onPressIgnore={onPressIgnore}
          />
        </View>
      )}
    </View>
  );
};

export default Posted;
