import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { primaryColor } from '@/styles/Common';
import { ImageInfo } from '@/types';

interface Props {
  style?: StyleProp<ViewStyle>;
  index: number;
  image: ImageInfo;
  onPressImage: (index: number) => void;
  onPressDeleteImage: (image: ImageInfo) => void;
}

export const THUMBNAIL_WIDTH = 64;

const styles = StyleSheet.create({
  container: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_WIDTH,
    position: 'relative',
    marginRight: 4,
  },
  image: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_WIDTH,
    borderRadius: 8,
  },
  closeIcon: {
    position: 'absolute',
    backgroundColor: primaryColor,
    right: -10,
    top: -10,
    zIndex: 10,
    width: 24,
    height: 24,
    borderColor: '#fff',
    borderRadius: 24 / 2,
    borderWidth: 2,
  },
  closeText: {
    position: 'absolute',
    fontSize: 18,
    color: '#fff',
    top: -2,
    left: 4.2,
    fontWeight: 'bold',
  },
});

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

export default React.memo(ThumbnailListItem);
