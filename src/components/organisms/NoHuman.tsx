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
  activeHuman: boolean | undefined;
  onPressAdReward?: () => void;
}

const NoHuman: React.FC<Props> = ({ activeHuman, onPressAdReward }) => {
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
        {activeHuman
          ? I18n.t('myDiary.noHuman')
          : I18n.t('myDiary.noHumanInactive')}
      </Text>
      {activeHuman && (
        <SubmitButton
          icon={iconSpellcheck}
          title={I18n.t('myDiary.noHumanButton')}
          onPress={onPressAdReward}
          containerStyle={styles.submitButton}
        />
      )}
    </View>
  );
};

export default NoHuman;
