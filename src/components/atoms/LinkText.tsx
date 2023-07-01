import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Hoverable from './Hoverable';
import AppText, { TextSize } from './AppText';
import { useAppTheme } from '@/styles/colors';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  size: TextSize;
  onPress: () => void;
};

const LinkText: React.FC<Props> = ({
  containerStyle,
  textStyle,
  size = 'm',
  text,
  onPress,
}) => {
  const theme = useAppTheme();
  return (
    <Hoverable style={containerStyle} onPress={onPress}>
      <AppText
        size={size}
        style={[
          {
            color: theme.colors.linkBlue,
          },
          textStyle,
        ]}
      >
        {text}
      </AppText>
    </Hoverable>
  );
};

export default React.memo(LinkText);
