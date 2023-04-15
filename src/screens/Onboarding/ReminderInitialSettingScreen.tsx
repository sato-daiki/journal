import React, { useCallback } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

import { SubmitButton } from '@/components/atoms';

import I18n from '@/utils/I18n';

import ReminderInitial from '@/components/organisms/ReminderInitial';
import { MyPageTabStackParamList } from '@/navigations/MyPageTabNavigator';

type ScreenType = StackScreenProps<
  MyPageTabStackParamList,
  'ReminderInitialSetting'
>;

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 64,
  },
  linkContainer: {
    height: 100,
  },
});

const ReminderInitialSettingScreen: React.FC<ScreenType> = ({ navigation }) => {
  const onPressSubmit = useCallback(() => {
    navigation.navigate('ReminderSelectTimeSetting');
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ReminderInitial />
        <View style={styles.linkContainer}>
          <SubmitButton
            title={I18n.t('reminderInitial.submit')}
            onPress={onPressSubmit}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ReminderInitialSettingScreen;
