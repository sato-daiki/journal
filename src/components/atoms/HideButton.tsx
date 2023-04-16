import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { fontSizeM, mainColor, hoverMain } from '../../styles/Common';
import I18n from '../../utils/I18n';
import Hoverable from './Hoverable';

interface Props {
  hidden: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  style: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  hidden: {
    color: mainColor,
    fontSize: fontSizeM,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  hover: {
    backgroundColor: hoverMain,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
});

const HideButton: React.FC<Props> = ({ hidden, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <Hoverable style={styles.style} onPress={onPress} hoverStyle={styles.hover}>
        <Text style={styles.hidden}>
          {hidden ? I18n.t('myDiaryCorrection.show') : I18n.t('myDiaryCorrection.hide')}
        </Text>
      </Hoverable>
    </View>
  );
};

export default React.memo(HideButton);
