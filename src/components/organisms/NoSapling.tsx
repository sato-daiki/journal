import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import I18n from '@/utils/I18n';
import * as Linking from 'expo-linking';
import { LinkText, SubmitButton } from '../atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM } from '@/styles/Common';
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
    marginBottom: 16,
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    marginBottom: 8,
  },
  linkText: {
    alignSelf: 'flex-end',
    marginBottom: 64,
  },
  submitButton: {
    paddingHorizontal: 16,
  },
});

interface Props {
  activeSapling: boolean | undefined;
  onPressAdReward?: () => void;
}

const NoSapling: React.FC<Props> = ({ activeSapling, onPressAdReward }) => {
  const iconSpellcheck = useMemo(
    () => <MaterialCommunityIcons size={22} color={'#fff'} name='spellcheck' />,
    [],
  );

  const onPressWhat = useCallback(() => {
    Linking.openURL(saplingUrl);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={SaplingLogo} style={styles.image} />
      <Text style={styles.text}>
        {activeSapling
          ? I18n.t('myDiary.noSapling')
          : I18n.t('myDiary.noSaplingInactive')}
      </Text>
      <LinkText
        containerStyle={styles.linkText}
        onPress={onPressWhat}
        text={I18n.t('myDiary.moreAi', { aiName: 'Sapling' })}
      />
      {activeSapling && (
        <SubmitButton
          icon={iconSpellcheck}
          title={I18n.t('myDiary.noSaplingButton')}
          onPress={onPressAdReward}
          containerStyle={styles.submitButton}
        />
      )}
    </View>
  );
};

export default NoSapling;
