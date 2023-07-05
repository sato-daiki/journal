import React, { ReactNode } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  StyleProp,
  TextStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import AppText from './AppText';

interface Props {
  textStyle?: StyleProp<TextStyle>;
  checked: boolean;
  text?: string;
  textComponent?: ReactNode;
  onPress: () => void;
}

const RadioBox: React.FC<Props> = ({
  textStyle,
  checked,
  text,
  textComponent,
  onPress,
}: Props) => {
  const theme = useAppTheme();
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          size={24}
          color={theme.colors.main}
          name={checked ? 'radiobox-marked' : 'radiobox-blank'}
        />
        {text && (
          <AppText size='m' style={[styles.radioBoxText, textStyle]}>
            {text}
          </AppText>
        )}
        {textComponent && textComponent}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioBoxText: {
    paddingLeft: 4,
  },
});

export default React.memo(RadioBox);
