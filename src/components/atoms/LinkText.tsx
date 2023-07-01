import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Hoverable from './Hoverable';
import AppText from './AppText';
import { useAppTheme } from '@/styles/colors';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  onPress: () => void;
};

const LinkText: React.FC<Props> = ({
  containerStyle,
  textStyle,
  text,
  onPress,
}) => {
  const theme = useAppTheme();
  return (
    <Hoverable style={containerStyle} onPress={onPress}>
      <AppText
        size='m'
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
