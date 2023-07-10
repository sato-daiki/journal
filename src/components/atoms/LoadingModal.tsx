import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ImageSourcePropType,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Loading } from '../../images';
import AppText from './AppText';
import { useAppTheme } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

const { height } = Dimensions.get('window');
const size = 40;

export interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  visible?: boolean;
  transparent?: boolean;
  text?: string;
  source?: ImageSourcePropType;
  size?: number;
}

const LoadingModal: React.FC<Props> = ({
  source = Loading,
  visible,
  transparent,
  text,
  containerStyle,
  textStyle,
}: Props) => {
  const theme = useAppTheme();
  return visible ? (
    <View
      style={[
        styles.overlay,
        { height, backgroundColor: theme.colors.backgroundTrans },
        transparent && styles.transparent,
        containerStyle,
      ]}
    >
      <Image source={source} style={styles.loadingImage} />
      {text ? (
        <AppText size='l' style={textStyle}>
          {text}
        </AppText>
      ) : null}
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    height,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  loadingImage: {
    width: moderateScale(size),
    height: moderateScale(size),
  },
});

export default React.memo(LoadingModal);
