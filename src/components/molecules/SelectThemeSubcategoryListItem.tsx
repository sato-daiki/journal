import React, { useCallback } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

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
import { ThemeSubcategoryInfo } from '@/screens/Modal/SelectThemeSubcategoryScreen/interface';
import { ThemeDiary } from '@/types';

interface Props {
  themeDiary?: ThemeDiary;
  item: ThemeSubcategoryInfo;
  onPress: (item: ThemeSubcategoryInfo) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  hover: {
    backgroundColor: hoverGray,
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
    color: subTextColor,
    fontSize: fontSizeS,
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
  learnTitle: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    marginBottom: 2,
  },
  nativeTitle: {
    color: subTextColor,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.1,
  },
});

const SelectThemeSubcategoryListItem: React.FC<Props> = ({
  themeDiary,
  item,
  onPress,
}) => {
  const onPressItem = useCallback(() => {
    onPress(item);
  }, [item, onPress]);

  return (
    <Hoverable
      style={styles.container}
      hoverStyle={styles.hover}
      onPress={onPressItem}
    >
      <Image style={styles.image} source={item.source} />
      <View style={styles.textContainer}>
        <View style={styles.column}>
          <Text style={styles.learnTitle}>{item.learnTitle}</Text>
          <Text style={styles.nativeTitle}>{item.nativeTitle}</Text>
        </View>
        {themeDiary ? (
          <View style={styles.textRight}>
            <Text style={styles.postDayText}>
              {getDay(themeDiary.updatedAt)}
            </Text>
            <DiaryStatusLabel
              color={MY_STATUS.checked.color}
              text={MY_STATUS.checked.text}
            />
          </View>
        ) : null}
      </View>
    </Hoverable>
  );
};

export default React.memo(SelectThemeSubcategoryListItem);
