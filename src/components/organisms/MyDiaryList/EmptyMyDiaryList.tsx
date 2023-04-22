import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Space } from '@/components/atoms';
import { subTextColor, mainColor, fontSizeS } from '@/styles/Common';
import I18n from '@/utils/I18n';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 64,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyUpper: {
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.6,
    color: subTextColor,
    textAlign: 'center',
  },
  emptyLower: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 6,
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 3,
    flexDirection: 'row',
    paddingLeft: 36,
  },
  emptyHintContainer: {
    paddingLeft: 8,
  },
  emptyHintText: {
    textAlign: 'left',
    fontWeight: '500',
    color: mainColor,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.4,
  },
});

const EmptyMyDiaryList: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.emptyUpper}>
        <MaterialCommunityIcons
          name='book-open-variant'
          size={50}
          color={subTextColor}
        />
        <Space size={8} />
        <Text style={styles.emptyText}>{I18n.t('emptyMyDiaryList.text')}</Text>
      </View>
    </View>
  );
};

export default React.memo(EmptyMyDiaryList);
