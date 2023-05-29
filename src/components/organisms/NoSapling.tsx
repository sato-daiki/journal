import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import I18n from '@/utils/I18n';
import * as Linking from 'expo-linking';
import { LinkText, Space, SubmitButton, WhiteButton } from '../atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, mainColor } from '@/styles/Common';
import { SaplingLogo } from '@/images';
import { saplingUrl } from '@/constants/url';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 76,
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
});

interface Props {
  isPremium: boolean;
  activeSapling: boolean | undefined;
  onPressCheck?: () => void;
  onPressAdReward?: () => void;
  onPressBecome?: () => void;
}

const NoSapling: React.FC<Props> = ({
  isPremium,
  activeSapling,
  onPressCheck,
  onPressAdReward,
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
    Linking.openURL(saplingUrl);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={SaplingLogo} style={styles.image} />
      <Space size={16} />
      {!activeSapling ? (
        <Text style={styles.text}>{I18n.t('noSapling.inactive')}</Text>
      ) : (
        <>
          {isPremium ? (
            <>
              <Text style={styles.text}>{I18n.t('noSapling.premiumText')}</Text>
              <Space size={16} />
              <LinkText
                containerStyle={styles.linkText}
                onPress={onPressWhat}
                text={I18n.t('noSapling.moreAi')}
              />
              <Space size={32} />
              <SubmitButton
                icon={iconSpellcheck}
                title={I18n.t('noSapling.check')}
                onPress={onPressCheck}
              />
            </>
          ) : (
            <>
              <Text style={styles.text}>{I18n.t('noSapling.text')}</Text>
              <Space size={4} />
              <LinkText
                containerStyle={styles.linkText}
                onPress={onPressWhat}
                text={I18n.t('noSapling.moreAi')}
              />
              <Space size={32} />
              <SubmitButton
                icon={iconWatch}
                title={I18n.t('noSapling.watch')}
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

export default NoSapling;
