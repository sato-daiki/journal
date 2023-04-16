import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { DiaryTitle, Hoverable } from '@/components/atoms';
import { MyDiaryStatus, ProfileIcons } from '@/components/molecules';

import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
  hoverGray,
} from '@/styles/Common';
import { getAlgoliaDay } from '@/utils/time';
import { Diary } from '@/types';

interface Props {
  mine?: boolean;
  item: Diary;
  onPressUser: (uid: string, userName: string) => void;
  onPressItem: (item: Diary) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
    backgroundColor: '#fff',
  },
  hover: {
    backgroundColor: hoverGray,
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
  icon: {
    paddingLeft: 6,
  },
});

const DiaryListItem = ({ mine = false, item, onPressUser, onPressItem }: Props) => {
  const {
    createdAt,
    title,
    text,
    correction,
    correction2,
    correction3,
    themeCategory,
    themeSubcategory,
  } = item;
  const postDay = getAlgoliaDay(createdAt);

  const onPressRow = useCallback(() => {
    onPressItem(item);
  }, [item, onPressItem]);

  return (
    <Hoverable hoverStyle={styles.hover} style={styles.container} onPress={onPressRow}>
      <View style={styles.header}>
        <Text style={styles.postDayText}>{postDay}</Text>
        {/* プロフィール画面からはステータスは表示しないようにする */}
        {mine ? <MyDiaryStatus diary={item} /> : null}
      </View>
      <DiaryTitle themeCategory={themeCategory} themeSubcategory={themeSubcategory} title={title} />
      <View style={styles.content}>
        <Text style={styles.text} ellipsizeMode='tail' numberOfLines={3}>
          {text}
        </Text>
        {correction ? (
          <View style={styles.icon}>
            <ProfileIcons
              correction={correction}
              correction2={correction2}
              correction3={correction3}
              onPressUser={onPressUser}
            />
          </View>
        ) : null}
      </View>
    </Hoverable>
  );
};

export default React.memo(DiaryListItem);
