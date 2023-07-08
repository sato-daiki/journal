import React, { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { useAppTheme } from '@/styles/colors';
import { PaperAndPen, StudentHat } from '@/images';
import {
  ModalSelectDiaryTypeStackNavigationProp,
  ModalSelectDiaryTypeStackParamList,
} from '@/navigations/ModalNavigator';
import I18n from '@/utils/I18n';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Layout } from '@/components/templates';
import HeaderText from '@/components/features/Header/HeaderText';
import SelecttionBox from '@/components/features/SelectDiaryType/SelecttionBox';
import { AppImage } from '@/components';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalSelectDiaryTypeStackParamList, 'SelectDiaryType'>,
  ModalSelectDiaryTypeStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
};

const SelectDiaryTypeScreen: React.FC<ScreenType> = ({ navigation }) => {
  const theme = useAppTheme();

  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />
      ),
    });
  }, [navigation, onPressClose]);

  const onPressFree = useCallback(() => {
    navigation.navigate('ModalPostDiary', { screen: 'PostDiary' });
  }, [navigation]);

  const onPressTheme = useCallback(() => {
    navigation.navigate('SelectTopicSubcategory');
  }, [navigation]);

  const onPressEiken1 = useCallback(() => {
    navigation.navigate('SelectEiken', {
      themeTitle: I18n.t('themeCategory.eiken1'),
      eikenCategory: 'eiken1',
    });
  }, [navigation]);

  const onPressEikenPre1 = useCallback(() => {
    navigation.navigate('SelectEiken', {
      themeTitle: I18n.t('themeCategory.eikenPre1'),
      eikenCategory: 'eikenPre1',
    });
  }, [navigation]);

  const onPressEiken2 = useCallback(() => {
    navigation.navigate('SelectEiken', {
      themeTitle: I18n.t('themeCategory.eiken2'),
      eikenCategory: 'eiken2',
    });
  }, [navigation]);

  const onPressEikenPre2 = useCallback(() => {
    navigation.navigate('SelectEiken', {
      themeTitle: I18n.t('themeCategory.eikenPre2'),
      eikenCategory: 'eikenPre2',
    });
  }, [navigation]);

  return (
    <Layout innerStyle={styles.container}>
      <View style={styles.row}>
        <SelecttionBox
          containerStyle={styles.marginRight}
          title={I18n.t('selectDiaryType.titleFree')}
          text={I18n.t('selectDiaryType.textFree')}
          image={<AppImage source={PaperAndPen} style={styles.image} />}
          onPress={onPressFree}
        />
        <SelecttionBox
          containerStyle={styles.marginLeft}
          title={I18n.t('selectDiaryType.titleTheme')}
          text={I18n.t('selectDiaryType.textTheme')}
          image={<AppImage source={StudentHat} style={styles.image} />}
          onPress={onPressTheme}
        />
      </View>

      <View style={styles.row}>
        <SelecttionBox
          containerStyle={styles.marginRight}
          title={I18n.t('themeCategory.eiken1')}
          text={I18n.t('selectDiaryType.textEiken1')}
          image={
            <MaterialCommunityIcons
              style={styles.icon}
              size={moderateScale(36)}
              color={theme.colors.primary}
              name={'numeric-1-box'}
            />
          }
          onPress={onPressEiken1}
        />
        <SelecttionBox
          containerStyle={styles.marginLeft}
          title={I18n.t('themeCategory.eikenPre1')}
          text={I18n.t('selectDiaryType.textEikenPre1')}
          image={
            <MaterialCommunityIcons
              style={styles.icon}
              size={moderateScale(32)}
              color={theme.colors.primary}
              name={'numeric-1-box-multiple-outline'}
            />
          }
          onPress={onPressEikenPre1}
        />
      </View>

      <View style={styles.row}>
        <SelecttionBox
          containerStyle={styles.marginRight}
          title={I18n.t('themeCategory.eiken2')}
          text={I18n.t('selectDiaryType.textEiken2')}
          image={
            <MaterialCommunityIcons
              style={styles.icon}
              size={moderateScale(36)}
              color={theme.colors.primary}
              name={'numeric-2-box'}
            />
          }
          onPress={onPressEiken2}
        />
        <SelecttionBox
          containerStyle={styles.marginLeft}
          title={I18n.t('themeCategory.eikenPre2')}
          text={I18n.t('selectDiaryType.textEikenPre2')}
          image={
            <MaterialCommunityIcons
              style={styles.icon}
              size={moderateScale(32)}
              color={theme.colors.primary}
              name={'numeric-2-box-multiple-outline'}
            />
          }
          onPress={onPressEikenPre2}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: verticalScale(32),
    alignItems: 'center',
  },
  row: {
    paddingHorizontal: horizontalScale(16),
    flexDirection: 'row',
    marginBottom: verticalScale(16),
  },
  marginRight: {
    marginRight: horizontalScale(8),
  },
  marginLeft: {
    marginLeft: horizontalScale(8),
  },
  image: {
    width: moderateScale(40),
    height: moderateScale(40),
    marginTop: verticalScale(16),
    marginBottom: verticalScale(16),
  },
  icon: {
    marginTop: verticalScale(8),
    marginBottom: verticalScale(4),
  },
});

export default SelectDiaryTypeScreen;
