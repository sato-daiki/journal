import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { getDay } from '@/utils/time';
import { ThemeDiary } from '@/types';
import { EikentTitle } from '@/screens/Modal/SelectEikenScreen/config/title';
import DiaryStatusLabel from '../MyDiary/MyDiaryStatusLabel/DiaryStatusLabel';
import { borderLight, useAppTheme } from '@/styles/colors';
import { AppText } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { horizontalScale, verticalScale } from '@/styles/metrics';

interface Props {
  themeDiary?: ThemeDiary;
  item: EikentTitle;
  onPress: (item: EikentTitle) => void;
}

const SelectEikenListItem: React.FC<Props> = ({
  themeDiary,
  item,
  onPress,
}) => {
  const theme = useAppTheme();
  const updatedAt = useMemo(() => {
    if (themeDiary) {
      return getDay(themeDiary.updatedAt.toDate());
    }
  }, [themeDiary]);

  const onPressItem = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPressItem}>
      <View style={styles.header}>
        <AppText size='s' color={theme.colors.secondary}>
          {item.subTitle}
        </AppText>
        {themeDiary ? (
          <View style={styles.textRight}>
            <AppText
              size='s'
              color={theme.colors.secondary}
              style={styles.postDayText}
            >
              {updatedAt}
            </AppText>
            <DiaryStatusLabel
              color={theme.colors.primary}
              text={I18n.t('myDiaryStatus.done')}
            />
          </View>
        ) : null}
      </View>
      <AppText size='m' bold>
        {item.title}
      </AppText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(4),
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
});

export default React.memo(SelectEikenListItem);
