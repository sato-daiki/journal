import React, { useCallback, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { DiaryStatusLabel, Hoverable } from '@/components/atoms';

import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  hoverGray,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { MY_STATUS } from '@/utils/diary';
import { getDay } from '@/utils/time';
import { ThemeDiary } from '@/types';
import { EikentTitle } from '@/screens/Modal/SelectEikenScreen/config/title';

interface Props {
  themeDiary?: ThemeDiary;
  item: EikentTitle;
  onPress: (item: EikentTitle) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    // flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  hover: {
    backgroundColor: hoverGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  subTitle: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
  textRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginLeft: 8,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
    marginRight: 8,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
    lineHeight: fontSizeM * 1.3,
  },
});

const SelectEikenListItem: React.FC<Props> = ({
  themeDiary,
  item,
  onPress,
}) => {
  const updatedAt = useMemo(() => {
    if (themeDiary) {
      return getDay(themeDiary.updatedAt);
    }
  }, [themeDiary]);

  const onPressItem = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <Hoverable
      style={styles.container}
      hoverStyle={styles.hover}
      onPress={onPressItem}
    >
      <View style={styles.header}>
        <Text style={styles.subTitle}>{item.subTitle}</Text>
        {themeDiary ? (
          <View style={styles.textRight}>
            <Text style={styles.postDayText}>{updatedAt}</Text>
            <DiaryStatusLabel
              color={MY_STATUS.done.color}
              text={MY_STATUS.done.text}
            />
          </View>
        ) : null}
      </View>
      <Text style={styles.title}>{item.title}</Text>
    </Hoverable>
  );
};

export default React.memo(SelectEikenListItem);
