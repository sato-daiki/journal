import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Space, AppText } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { useAppTheme } from '@/styles/colors';
import { moderateScale, verticalScale } from '@/styles/metrics';

const EmptyMyDiaryList: React.FC = () => {
  const theme = useAppTheme();
  return (
    <View style={styles.container}>
      <View style={styles.emptyUpper}>
        <MaterialCommunityIcons
          size={moderateScale(50)}
          color={theme.colors.secondary}
          name='book-open-variant'
        />
        <Space size={8} />
        <AppText size='s' textAlign='center' color={theme.colors.secondary}>
          {I18n.t('emptyMyDiaryList.text')}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(64),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  emptyUpper: {
    alignItems: 'center',
  },
});

export default React.memo(EmptyMyDiaryList);
