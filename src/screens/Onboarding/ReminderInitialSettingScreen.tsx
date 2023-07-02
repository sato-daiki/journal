import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { Layout } from '@/components/templates';
import { SubmitButton } from '@/components/atoms';
import I18n from '@/utils/I18n';
import ReminderInitial from '@/components/features/ReminderSelectTime/ReminderInitial';
import { SettingTabStackParamList } from '@/navigations/SettingTabNavigator';

type ScreenType = StackScreenProps<
  SettingTabStackParamList,
  'ReminderInitialSetting'
>;

const ReminderInitialSettingScreen: React.FC<ScreenType> = ({ navigation }) => {
  const onPressSubmit = useCallback(() => {
    navigation.navigate('ReminderSelectTimeSetting');
  }, [navigation]);

  return (
    <Layout innerStyle={styles.container}>
      <ReminderInitial />
      <View style={styles.linkContainer}>
        <SubmitButton
          title={I18n.t('reminderInitial.submit')}
          onPress={onPressSubmit}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  linkContainer: {
    height: 100,
  },
});

export default ReminderInitialSettingScreen;
