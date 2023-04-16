import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { primaryColor, fontSizeLL } from '../../../styles/Common';
import { getSize } from '../../../utils/responsibleCss';

interface Props {
  text: string;
  isMobileDevice: boolean;
}

const styles = StyleSheet.create({
  text: {
    color: primaryColor,
  },
});

const BodyText = ({ text, isMobileDevice = false }: Props) => {
  return (
    <Text
      style={[
        styles.text,
        {
          fontSize: getSize(isMobileDevice, fontSizeLL),
          lineHeight: getSize(isMobileDevice, fontSizeLL) * 1.3,
        },
      ]}
    >
      {text}
    </Text>
  );
};

export default BodyText;
