import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

import { HeaderText, Icon } from '@/components/atoms';
import I18n from '@/utils/I18n';
import {
  ModalImageListStackNavigationProp,
  ModalImageListStackParamList,
} from '@/navigations/ModalNavigator';
import { offWhite, primaryColor, subTextColor } from '@/styles/Common';
import ImageListItem from '@/components/organisms/ImageListItem';

type NavigationProp = CompositeNavigationProp<
  StackNavigationProp<ModalImageListStackParamList, 'ImageList'>,
  ModalImageListStackNavigationProp
>;

type ImageListRouteProp = RouteProp<ModalImageListStackParamList, 'ImageList'>;

type ScreenType = {
  navigation: NavigationProp;
  route: ImageListRouteProp;
};

const ICON_WIDTH = 32;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: offWhite,
  },
  swiper: {
    backgroundColor: '#000',
  },
  icon: {
    backgroundColor: primaryColor,
    width: ICON_WIDTH,
    height: ICON_WIDTH,
    borderRadius: ICON_WIDTH / 2,
  },
});

const ImageListScreen: React.FC<ScreenType> = ({ navigation, route }) => {
  const { images, defaultIndex } = route.params;
  const sliderX = useRef<Swiper | null>(null);
  const [index, setIndex] = useState(defaultIndex);

  const onPressGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderText text={I18n.t('common.close')} onPress={onPressGoBack} />
      ),
    });
  }, [navigation, onPressGoBack]);

  const onIndexChanged = useCallback((value) => {
    setIndex(value);
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Swiper
        style={styles.swiper}
        ref={sliderX}
        index={index}
        activeDotColor={'#fff'}
        dotColor={subTextColor}
        loop={false}
        showsButtons={true}
        onIndexChanged={onIndexChanged}
        nextButton={
          <View style={[styles.icon, { marginRight: 8 }]}>
            <Icon
              style={{ paddingLeft: 3, paddingTop: 2 }}
              icon='community'
              name='chevron-right'
              size={26}
              color='#fff'
            />
          </View>
        }
        prevButton={
          <View style={[styles.icon, { marginLeft: 8 }]}>
            <Icon
              style={{ paddingLeft: 2, paddingTop: 2 }}
              icon='community'
              name='chevron-left'
              size={26}
              color='#fff'
            />
          </View>
        }
      >
        {images.map((image, i) => (
          <ImageListItem key={i} imageUrl={image.imageUrl} />
        ))}
      </Swiper>
    </SafeAreaView>
  );
};

export default ImageListScreen;
