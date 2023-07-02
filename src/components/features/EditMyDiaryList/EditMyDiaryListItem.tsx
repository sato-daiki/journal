import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { getDay } from '@/utils/time';
import { Diary } from '@/types';
import { useAppTheme } from '@/styles/colors';
import { AppText, Icon } from '@/components/atoms';
import DiaryTitle from '../MyDiary/DiaryTitle';
import MyDiaryStatusLabel from '../MyDiary/MyDiaryStatusLabel';

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
      <View
        style={[
          styles.container,
          { borderBottomColor: theme.colors.borderLight },
        ]}
      >
        <View style={styles.leftContainer}>
          <Icon
            icon='community'
            size={22}
            color={checked ? theme.colors.green : theme.colors.borderLight}
            name={checked ? 'check-circle' : 'checkbox-blank-circle'}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.header}>
            <AppText size='s' color={theme.colors.secondary}>
              {postDay}
            </AppText>
            <MyDiaryStatusLabel diary={item} />
          </View>
          <DiaryTitle
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftContainer: {
    paddingRight: 16,
  },
  rightContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 4,
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
