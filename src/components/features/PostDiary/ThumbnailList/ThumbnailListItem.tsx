import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';
import { ImageInfo } from '@/types';
import { black, white } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  style?: StyleProp<ViewStyle>;
  index: number;
  image: ImageInfo;
  onPressImage: (index: number) => void;
  onPressDeleteImage: (image: ImageInfo) => void;
}

export const THUMBNAIL_WIDTH = 64;

const ThumbnailListItem: React.FC<Props> = ({
  index,
  style,
  image,
  onPressImage: propsImage,
  onPressDeleteImage: propsDeleteImage,
}) => {
  const onPressImage = useCallback(() => {
    propsImage(index);
  }, [index, propsImage]);

  const onPressDeleteImage = useCallback(() => {
    propsDeleteImage(image);
  }, [image, propsDeleteImage]);

  return (
    <TouchableOpacity onPress={onPressImage} style={[styles.container, style]}>
      <Image source={{ uri: image.imageUrl }} style={styles.image} />
      <TouchableOpacity style={styles.closeIcon} onPress={onPressDeleteImage}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: moderateScale(THUMBNAIL_WIDTH),
    height: moderateScale(THUMBNAIL_WIDTH),
    position: 'relative',
    marginRight: horizontalScale(4),
  },
  image: {
    width: moderateScale(THUMBNAIL_WIDTH),
    height: moderateScale(THUMBNAIL_WIDTH),
    borderRadius: moderateScale(8),
  },
  closeIcon: {
    position: 'absolute',
    right: horizontalScale(-10),
    top: verticalScale(-10),
    zIndex: 10,
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(24 / 2),
    borderWidth: moderateScale(2),
    backgroundColor: black,
    borderColor: white,
  },
  closeText: {
    position: 'absolute',
    fontSize: moderateScale(18),
    top: verticalScale(-2),
    left: horizontalScale(4.2),
    fontWeight: 'bold',
    color: white,
  },
});

export default React.memo(ThumbnailListItem);
