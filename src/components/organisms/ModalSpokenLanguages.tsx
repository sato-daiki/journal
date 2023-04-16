import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Language } from '@/types';
import I18n from '@/utils/I18n';
import { fontSizeL, fontSizeM, maxPartL } from '@/styles/Common';
import { getEachOS } from '@/utils/common';
import { getLanguage } from '@/utils/diary';
import { SubmitButton, WhiteButton, Space } from '@/components/atoms';
import { Modal } from '@/components/template';

export interface Props {
  visible: boolean;
  languages: Language[];
  defaultLanguage?: Language;
  onPressSubmit: (value: Language) => void;
  onPressClose: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  picker: {
    maxWidth: maxPartL,
    width: '100%',
    height: getEachOS({ ios: undefined, android: undefined, web: 40 }),
    fontSize: Platform.OS === 'web' ? fontSizeL : fontSizeM,
  },
});

const ModalSpokenLanguages: React.FC<Props> = ({
  visible,
  languages,
  defaultLanguage,
  onPressSubmit,
  onPressClose,
}) => {
  const [value, setValue] = useState<Language | null>(defaultLanguage || null);

  const onValueChange = useCallback((itemValue: React.ReactText) => {
    setValue(itemValue as Language);
  }, []);

  const onPress = useCallback(() => {
    onPressSubmit(value || languages[0]);
    setValue(null);
  }, [languages, onPressSubmit, value]);

  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <Picker
          style={styles.picker}
          selectedValue={value || languages[0]}
          onValueChange={onValueChange}
        >
          {languages.map((item) => (
            <Picker.Item key={item} label={getLanguage(item)} value={item} />
          ))}
        </Picker>
        {Platform.OS === 'ios' ? null : <Space size={16} />}
        <SubmitButton title='OK' onPress={onPress} />
        <Space size={16} />
        <WhiteButton title={I18n.t('common.cancel')} onPress={onPressClose} />
      </View>
    </Modal>
  );
};

export default React.memo(ModalSpokenLanguages);
