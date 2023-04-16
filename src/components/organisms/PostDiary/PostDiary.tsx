import React, { useState, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Image,
  Animated,
  Easing,
} from 'react-native';
import {
  primaryColor,
  borderLightColor,
  offWhite,
  fontSizeSS,
  softRed,
} from '@/styles/Common';
import { Points } from '@/images';
import { getMaxPostText, getUsePoints } from '@/utils/diary';
import I18n from '@/utils/I18n';

import { LoadingModal } from '@/components/atoms';
import { ModalPublish } from '@/components/organisms/ModalPublish';
import ModalLackPoint from '@/components/organisms/ModalLackPoint';
import ModalDiaryCancel from '@/components/organisms/ModalDiaryCancel';
import TutorialPostDiary from '@/components/organisms/TutorialPostDiary';
import ModalConfirm from '@/components/organisms/ModalConfirm';
// @ts-ignore
import PostDiaryKeyboard from './PostDiaryKeyboard';
import { PostDiaryProps } from './interface';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: offWhite,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingLeft: 16,
    borderColor: borderLightColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    width: 16,
    height: 16,
    tintColor: primaryColor,
    marginRight: 3,
  },
  headerLabel: {
    color: primaryColor,
    fontSize: fontSizeSS,
    marginRight: 4,
  },
  headerValue: {
    color: primaryColor,
    fontSize: fontSizeSS,
    marginRight: 16,
  },
});

const PostDiary: React.FC<PostDiaryProps> = ({
  navigation,
  isLoading,
  isModalLack,
  isModalAlert,
  isModalCancel,
  isModalError,
  isPublish,
  isTutorialLoading = false,
  tutorialPostDiary = true,
  errorMessage,
  title,
  text,
  themeCategory,
  themeSubcategory,
  publishMessage,
  points,
  learnLanguage,
  onPressSubmitModalLack,
  onPressCloseModalLack,
  onPressWatchAdModalLack,
  onPressCloseModalPublish,
  onPressCloseModalCancel,
  onClosePostDiary,
  onChangeTextTitle,
  onChangeTextText,
  onPressSubmit,
  onPressDraft,
  onPressNotSave,
  onPressTutorial,
  onPressCloseError,
}) => {
  const [isForce, setIsForce] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      easing: Easing.back(1),
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const onFocusText = useCallback((): void => {
    setFadeAnim(new Animated.Value(0));
    setIsForce(true);
  }, []);

  const usePoints = getUsePoints(text.length, learnLanguage);
  const maxPostText = getMaxPostText(learnLanguage);

  const onBlurText = useCallback((): void => setIsForce(false), []);

  const onPressThemeGuide = useCallback(() => {
    if (!themeCategory || !themeSubcategory) return;
    navigation.push('ModalThemeGuide', {
      screen: 'ThemeGuide',
      params: {
        themeCategory,
        themeSubcategory,
        caller: 'PostDiary',
      },
    });
  }, [navigation, themeCategory, themeSubcategory]);

  return (
    <SafeAreaView style={styles.container}>
      <LoadingModal visible={isLoading} />
      <ModalConfirm
        visible={isModalError}
        title={I18n.t('common.error')}
        message={errorMessage}
        mainButtonText={I18n.t('common.close')}
        onPressMain={onPressCloseError}
      />
      <TutorialPostDiary
        isLoading={isTutorialLoading}
        displayed={tutorialPostDiary}
        learnLanguage={learnLanguage}
        onPress={onPressTutorial}
      />
      <ModalLackPoint
        visible={isModalLack}
        learnLanguage={learnLanguage}
        onPressSubmit={onPressSubmitModalLack}
        onPressClose={onPressCloseModalLack}
        onPressWatchAd={onPressWatchAdModalLack}
      />
      <ModalPublish
        visible={isModalAlert}
        isPublish={isPublish}
        isLoading={isLoading}
        usePoints={usePoints}
        points={points}
        publishMessage={publishMessage}
        onPressSubmit={onPressSubmit}
        onPressCloseCancel={onPressCloseModalPublish}
        onClosePostDiary={onClosePostDiary}
      />
      <ModalDiaryCancel
        visible={isModalCancel}
        isLoading={isLoading}
        onPressSave={onPressDraft}
        onPressNotSave={onPressNotSave}
        onPressClose={onPressCloseModalCancel}
      />
      <View style={styles.header}>
        <View style={styles.left}>
          <Text style={styles.headerLabel}>
            {I18n.t('postDiaryComponent.usePoints')}
          </Text>
          <Text style={styles.headerValue}>{usePoints}</Text>
          <Text style={styles.headerLabel}>
            {I18n.t('postDiaryComponent.textLength')}
          </Text>
          <Text
            style={[
              styles.headerValue,
              { color: text.length === maxPostText ? softRed : primaryColor },
            ]}
          >
            {text.length}
          </Text>
        </View>
        <View style={styles.right}>
          <Image style={styles.points} source={Points} />
          <Text style={styles.headerLabel}>
            {I18n.t('postDiaryComponent.points')}
          </Text>
          <Text style={styles.headerValue}>{points}</Text>
        </View>
      </View>
      <PostDiaryKeyboard
        title={title}
        text={text}
        learnLanguage={learnLanguage}
        themeCategory={themeCategory}
        themeSubcategory={themeSubcategory}
        isForce={isForce}
        fadeAnim={fadeAnim}
        onPressThemeGuide={onPressThemeGuide}
        onChangeTextTitle={onChangeTextTitle}
        onChangeTextText={onChangeTextText}
        onPressDraft={onPressDraft}
        onFocusText={onFocusText}
        onBlurText={onBlurText}
      />
    </SafeAreaView>
  );
};

export default PostDiary;
