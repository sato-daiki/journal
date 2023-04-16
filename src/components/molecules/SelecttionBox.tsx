import React, { ReactNode } from 'react';

import { fontSizeM, primaryColor } from '@/styles/Common';
import {
  Platform,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Hoverable, Pill } from '@/components/atoms';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  text: string;
  recommendText?: string;
  image?: ReactNode;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: primaryColor,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
  },
  main: {
    alignItems: 'center',
  },
  pill: {
    position: 'absolute',
    top: Platform.OS === 'web' ? -40 : -32,
  },
  title: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    lineHeight: fontSizeM * 1.3,
    marginBottom: 16,
  },
  text: {
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
});

const SelecttionBox: React.FC<Props> = ({
  containerStyle,
  title,
  text,
  recommendText,
  image,
  onPress,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {recommendText ? (
        <Pill
          containerStyle={styles.pill}
          text={recommendText}
          color="#fff"
          backgroundColor="red"
        />
      ) : null}
      <Hoverable style={styles.main} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        {image}
        <Text style={styles.text}>{text}</Text>
      </Hoverable>
    </View>
  );
};

export default SelecttionBox;
