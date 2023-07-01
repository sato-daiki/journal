import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  green,
} from '@/styles/Common';
import { DiaryTitle, MyDiaryStatus } from '@/components/molecules';
import { getDay } from '@/utils/time';
import { Diary } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  item: Diary;
  handlePress: (objectID: string) => void;
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
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
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    textAlign: 'left',
    flex: 1,
  },
});

const EditMyDiaryListItem = ({ item, handlePress }: Props) => {
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
          <MaterialCommunityIcons
            size={22}
            color={checked ? green : borderLightColor}
            name={checked ? 'check-circle' : 'checkbox-blank-circle'}
          />
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.header}>
            <Text style={styles.postDayText}>{postDay}</Text>
            <MyDiaryStatus diary={item} />
          </View>
          <DiaryTitle
            themeCategory={themeCategory}
            themeSubcategory={themeSubcategory}
            title={title}
          />
          <View style={styles.content}>
            <Text style={styles.text} ellipsizeMode='tail' numberOfLines={3}>
              {text}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(EditMyDiaryListItem);
