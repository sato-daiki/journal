import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RadioBox } from '@/components/atoms';
import { mainColor } from '@/styles/Common';
import { Language, languages } from '@/types';
import I18n from '@/utils/I18n';

export interface Props {
  learnLanguage: Language;
  setLearnLanguage: (language: Language) => void;
}

const LanguageRadioboxes: React.FC<Props> = ({
  learnLanguage,
  setLearnLanguage,
}) => {
  return (
    <View style={styles.radioBoxWrapper}>
      {languages.map((language, index) => (
        <View key={index} style={styles.radioBox}>
          <RadioBox
            checked={learnLanguage === language}
            color={mainColor}
            text={I18n.t(`language.${language}`)}
            onPress={(): void => setLearnLanguage(language)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioBoxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  radioBox: {
    marginRight: 8,
    marginBottom: 8,
  },
});

export default LanguageRadioboxes;
