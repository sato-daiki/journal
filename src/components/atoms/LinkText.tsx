import React from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import AppText, { TextSize } from './AppText';
import { linkBlue } from '@/styles/colors';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  size: TextSize;
  textAlign?: TextStyle['textAlign'];
  bold?: boolean;
  onPress: () => void;
};

const LinkText: React.FC<Props> = ({
  containerStyle,
  textStyle,
  size = 'm',
  textAlign,
  bold,
  text,
  onPress,
}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <AppText
        size={size}
        textAlign={textAlign}
        bold={bold}
        style={[
          {
            color: linkBlue,
          },
          textStyle,
        ]}
      >
        {text}
      </AppText>
    </TouchableOpacity>
  );
};

export default React.memo(LinkText);
