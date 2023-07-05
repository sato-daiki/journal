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
              name={'numeric-1-box'}
              size={36}
              style={styles.icon}
              color={theme.colors.primary}
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
              name={'numeric-1-box-multiple-outline'}
              size={32}
              style={styles.icon}
              color={theme.colors.primary}
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
              name={'numeric-2-box'}
              size={36}
              style={styles.icon}
              color={theme.colors.primary}
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
              name={'numeric-2-box-multiple-outline'}
              size={32}
              style={styles.icon}
              color={theme.colors.primary}
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
    paddingTop: 32,
    alignItems: 'center',
  },
  row: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    marginBottom: 16,
  },
  marginRight: {
    marginRight: 8,
  },
  marginLeft: {
    marginLeft: 8,
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 16,
    marginBottom: 16,
  },
  icon: {
    marginTop: 8,
    marginBottom: 4,
  },
});

export default SelectDiaryTypeScreen;
