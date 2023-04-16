import React, { useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { PaperAndPen, StudentHat } from '@/images';
import {
  ModalSelectDiaryTypeStackNavigationProp,
  ModalSelectDiaryTypeStackParamList,
} from '@/navigations/ModalNavigator';
import I18n from '@/utils/I18n';
import { SelecttionBox } from '@/components/molecules';
import { HeaderText } from '@/components/atoms';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalSelectDiaryTypeStackParamList, 'SelectDiaryType'>,
  ModalSelectDiaryTypeStackNavigationProp
>;

type ScreenType = {
  navigation: NavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 64,
    alignItems: 'center',
  },
  row: {
    paddingHorizontal: 16,
    flexDirection: 'row',
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
    marginBottom: 16,
  },
});

const SelectDiaryTypeScreen: React.FC<ScreenType> = ({ navigation }) => {
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderText text={I18n.t('common.close')} onPress={onPressClose} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressFree = useCallback(() => {
    navigation.navigate('ModalPostDiary', { screen: 'PostDiary' });
  }, [navigation]);

  const onPressTheme = useCallback(() => {
    navigation.navigate('SelectThemeSubcategory');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <SelecttionBox
          containerStyle={styles.marginRight}
          title={I18n.t('selectDiaryType.titleFree')}
          text={I18n.t('selectDiaryType.textFree')}
          image={<Image source={PaperAndPen} style={styles.image} />}
          onPress={onPressFree}
        />
        <SelecttionBox
          recommendText={I18n.t('selectDiaryType.recommend')}
          containerStyle={styles.marginLeft}
          title={I18n.t('selectDiaryType.titleTheme')}
          text={I18n.t('selectDiaryType.textTheme')}
          image={<Image source={StudentHat} style={styles.image} />}
          onPress={onPressTheme}
        />
      </View>
    </View>
  );
};

export default SelectDiaryTypeScreen;
