import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDay } from '@/utils/time';
import { Diary } from '@/types';
import { borderLight, green, useAppTheme } from '@/styles/colors';
import { AppText } from '@/components/atoms';
import DiaryTitleWithPill from '../MyDiary/DiaryTitleWithPill';
import MyDiaryStatusLabel from '../MyDiary/MyDiaryStatusLabel';
import { Icon } from '@/components/templates';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  item: Diary;
  handlePress: (objectID: string) => void;
}

const EditMyDiaryListItem = ({ item, handlePress }: Props) => {
  const theme = useAppTheme();
  const { createdAt, title, text, themeCategory, themeSubcategory } = item;
  const [checked, setChecked] = useState(false);
  const postDay = useMemo(() => getDay(createdAt.toDate()), [createdAt]);

  const onPress = useCallback(() => {
    if (!item.objectID) return;
    setChecked(!checked);
    handlePress(item.objectID);
  }, [checked, handlePress, item.objectID]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Icon onPress={onPress}>
            <MaterialCommunityIcons
              size={moderateScale(22)}
              color={checked ? green : borderLight}
              name={checked ? 'check-circle' : 'checkbox-blank-circle'}
            />
          </Icon>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.header}>
            <AppText size='s' color={theme.colors.secondary}>
              {postDay}
            </AppText>
            <MyDiaryStatusLabel diary={item} />
          </View>
          <DiaryTitleWithPill
            isTail={true}
            themeCategory={themeCategory}
            themeSubcategory={themeSubcategory}
            title={title}
          />
          <View style={styles.content}>
            <AppText
              size='m'
              textAlign='left'
              style={styles.text}
              ellipsizeMode='tail'
              numberOfLines={3}
            >
              {text}
            </AppText>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: borderLight,
  },
  leftContainer: {
    paddingRight: horizontalScale(16),
  },
  rightContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: verticalScale(4),
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    flex: 1,
  },
});

export default React.memo(EditMyDiaryListItem);
