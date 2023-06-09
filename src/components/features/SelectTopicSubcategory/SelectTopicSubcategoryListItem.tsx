import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDay } from '@/utils/time';
import { TopicSubcategoryInfo } from '@/screens/Modal/SelectTopicSubcategoryScreen/interface';
import { ThemeDiary } from '@/types';
import DiaryStatusLabel from '../MyDiary/MyDiaryStatusLabel/DiaryStatusLabel';
import { borderLight, useAppTheme } from '@/styles/colors';
import { AppImage, AppText, Space } from '@/components/atoms';
import I18n from '@/utils/I18n';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

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
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <AppImage style={styles.image} source={item.source} />
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
              color={theme.colors.primary}
              text={I18n.t('myDiaryStatus.checked')}
            />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLight,
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
    marginLeft: horizontalScale(8),
  },
  postDayText: {
    marginRight: horizontalScale(8),
  },
  image: {
    width: moderateScale(36),
    height: moderateScale(36),
    marginRight: horizontalScale(16),
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default React.memo(SelectTopicSubcategoryListItem);
