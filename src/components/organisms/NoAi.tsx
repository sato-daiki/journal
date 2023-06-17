import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import I18n from '@/utils/I18n';
import * as Linking from 'expo-linking';
import { LinkText, Space, SubmitButton, WhiteButton } from '../atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, mainColor } from '@/styles/Common';
import { AiName, getWhatUrl } from '@/utils/grammarCheck';
import { SaplingLogo, ProWritingAidLogo } from '@/images';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: 'center',
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    alignSelf: 'flex-start',
  },
  linkText: {
    alignSelf: 'flex-end',
  },
  submitButton: {
    paddingHorizontal: 16,
  },
  saplingLogo: {
    width: 300,
    height: 76,
  },
  proWritingAidLogo: {
    width: 300,
    height: 64,
  },
});

interface Props {
  isPremium: boolean;
  aiName: AiName;
  active: boolean | undefined;
  onPressCheck?: (aiName: AiName) => void;
  onPressAdReward?: (aiName: AiName) => void;
  onPressBecome?: () => void;
}

const NoAi: React.FC<Props> = ({
  isPremium,
  aiName,
  active,
  onPressCheck: propsPressCheck,
  onPressAdReward: propsPressAdReward,
  onPressBecome,
}) => {
  const iconSpellcheck = useMemo(
    () => <MaterialCommunityIcons size={22} color={'#fff'} name='spellcheck' />,
    [],
  );

  const iconWatch = useMemo(
    () => <MaterialCommunityIcons size={22} color={'#fff'} name='play' />,
    [],
  );

  const iconBecome = useMemo(
    () => <MaterialCommunityIcons size={18} color={mainColor} name='star' />,
    [],
  );

  const onPressWhat = useCallback(() => {
    const url = getWhatUrl(aiName);
    if (url) {
      Linking.openURL(url);
    }
  }, [aiName]);

  const onPressCheck = useCallback(() => {
    propsPressCheck?.(aiName);
  }, [aiName, propsPressCheck]);

  const onPressAdReward = useCallback(() => {
    propsPressAdReward?.(aiName);
  }, [aiName, propsPressAdReward]);

  return (
    <View style={styles.container}>
      {aiName === 'Sapling' ? (
        <Image source={SaplingLogo} style={styles.saplingLogo} />
      ) : aiName === 'ProWritingAid' ? (
        <Image source={ProWritingAidLogo} style={styles.proWritingAidLogo} />
      ) : null}
      <Space size={16} />
      {!active ? (
        <Text style={styles.text}>{I18n.t('noAi.inactive', { aiName })}</Text>
      ) : (
        <>
          {isPremium ? (
            <>
              <Text style={styles.text}>
                {I18n.t('noAi.premiumText', { aiName })}
              </Text>
              <Space size={16} />
              <LinkText
                containerStyle={styles.linkText}
                onPress={onPressWhat}
                text={I18n.t('noAi.moreAi', { aiName })}
              />
              <Space size={32} />
              <SubmitButton
                icon={iconSpellcheck}
                title={I18n.t('noAi.check')}
                onPress={onPressCheck}
              />
            </>
          ) : (
            <>
              <Text style={styles.text}>{I18n.t('noAi.text', { aiName })}</Text>
              <Space size={4} />
              <LinkText
                containerStyle={styles.linkText}
                onPress={onPressWhat}
                text={I18n.t('noAi.moreAi', { aiName })}
              />
              <Space size={32} />
              <SubmitButton
                icon={iconWatch}
                title={I18n.t('noAi.watch')}
                onPress={onPressAdReward}
                containerStyle={styles.submitButton}
              />
              <Space size={16} />
              <WhiteButton
                icon={iconBecome}
                title={I18n.t('myDiary.become')}
                onPress={onPressBecome}
                containerStyle={styles.submitButton}
              />
            </>
          )}
        </>
      )}
    </View>
  );
};

export default NoAi;
