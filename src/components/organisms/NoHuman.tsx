import React, { useMemo } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import I18n from '@/utils/I18n';
import { SubmitButton } from '../atoms';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM } from '@/styles/Common';
import { SaplingLogo } from '@/images';

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
}

const NoHuman: React.FC<Props> = ({ activeHuman }) => {
  const iconSpellcheck = useMemo(
    () => <MaterialCommunityIcons size={22} color={'#fff'} name='spellcheck' />,
    [],
  );

  return (
    <View style={styles.container}>
      <Image source={SaplingLogo} style={styles.image} />
      <Text style={styles.text}>
        {activeHuman
          ? I18n.t('noHuman.noHuman')
          : I18n.t('noHuman.noHumanInactive')}
      </Text>
      {activeHuman && (
        <SubmitButton
          icon={iconSpellcheck}
          title={I18n.t('noHuman.noHumanButton')}
          containerStyle={styles.submitButton}
        />
      )}
    </View>
  );
};

export default NoHuman;
