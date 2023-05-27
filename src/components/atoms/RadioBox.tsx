import React, { ReactNode } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  StyleProp,
  TextStyle,
} from 'react-native';
import { mainColor, fontSizeM, primaryColor } from '../../styles/Common';

interface Props {
  textStyle?: StyleProp<TextStyle>;
  checked: boolean;
  color: string;
  text?: string;
  textComponent?: ReactNode;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBoxText: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingLeft: 4,
  },
});

const RadioBox: React.FC<Props> = ({
  textStyle,
  checked,
  color = mainColor,
  text,
  textComponent,
  onPress,
}: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          size={24}
          color={color}
          name={checked ? 'radiobox-marked' : 'radiobox-blank'}
        />
        {text && <Text style={[styles.radioBoxText, textStyle]}>{text}</Text>}
        {textComponent && textComponent}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(RadioBox);
