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
import { softRed, useAppTheme, white } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  text: string;
  image?: ReactNode;
  onPress?: () => void;
}

const SelecttionBox: React.FC<Props> = ({
  containerStyle,
  title,
  text,
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
    borderRadius: moderateScale(8),
    borderWidth: moderateScale(1),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    alignItems: 'center',
  },
  main: {
    alignItems: 'center',
  },
  pill: {
    position: 'absolute',
    top: verticalScale(-32),
  },
});

export default SelecttionBox;
