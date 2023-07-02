import React, { useCallback } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { MY_STATUS } from '@/utils/diary';
import { getDay } from '@/utils/time';
import { TopicSubcategoryInfo } from '@/screens/Modal/SelectTopicSubcategoryScreen/interface';
import { ThemeDiary } from '@/types';
import DiaryStatusLabel from '../MyDiary/MyDiaryStatusLabel/DiaryStatusLabel';
import { useAppTheme } from '@/styles/colors';
import { AppText, Space } from '@/components/atoms';

interface Props {
  themeDiary?: ThemeDiary;
  item: TopicSubcategoryInfo;
  onPress: (item: TopicSubcategoryInfo) => void;
}

const SelectTopicSubcategoryListItem: React.FC<Props> = ({
  themeDiary,
  item,
  onPress,
}) => {
  const theme = useAppTheme();

  const onPressItem = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderBottomColor: theme.colors.borderLight },
      ]}
      onPress={onPressItem}
    >
      <Image style={styles.image} source={item.source} />
      <View style={styles.textContainer}>
        <View style={styles.column}>
          <AppText size='m'>{item.learnTitle}</AppText>
          <Space size={2} />
          <AppText size='m' color={theme.colors.secondary}>
            {item.nativeTitle}
          </AppText>
        </View>
        {themeDiary ? (
          <View style={styles.textRight}>
            <AppText
              size='s'
              color={theme.colors.secondary}
              style={styles.postDayText}
            >
              {getDay(themeDiary.updatedAt.toDate())}
            </AppText>
            <DiaryStatusLabel
              color={MY_STATUS.checked.color}
              text={MY_STATUS.checked.text}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  textRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 8,
  },
  postDayText: {
    marginRight: 8,
  },
  image: {
    width: 36,
    height: 36,
    marginRight: 16,
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default React.memo(SelectTopicSubcategoryListItem);
