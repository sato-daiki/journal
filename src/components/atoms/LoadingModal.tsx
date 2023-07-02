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
}: Props) =>
  visible ? (
    <View
      style={[
        styles.overlay,
        { height },
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

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
    height,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  loadingImage: {
    width: size,
    height: size,
  },
});

export default React.memo(LoadingModal);
