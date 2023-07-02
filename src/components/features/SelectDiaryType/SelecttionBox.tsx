import React, { ReactNode } from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { AppText, Pill } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  text: string;
  recommendText?: string;
  image?: ReactNode;
  onPress?: () => void;
}

const SelecttionBox: React.FC<Props> = ({
  containerStyle,
  title,
  text,
  recommendText,
  image,
  onPress,
}) => {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        { borderColor: theme.colors.primary },
        containerStyle,
      ]}
    >
      {recommendText ? (
        <Pill
          containerStyle={styles.pill}
          text={recommendText}
          color='#fff'
          backgroundColor='red'
        />
      ) : null}
      <TouchableOpacity style={styles.main} onPress={onPress}>
        <AppText bold size='m'>
          {title}
        </AppText>
        {image}
        <AppText size='m'>{text}</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default SelecttionBox;
