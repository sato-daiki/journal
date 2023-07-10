import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageInfo } from '@/types';
import { useAppTheme } from '@/styles/colors';
import { horizontalScale, moderateScale } from '@/styles/metrics';
import { Icon } from '@/components/templates';

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
  const theme = useAppTheme();

  const onPressImage = useCallback(() => {
    propsImage(index);
  }, [index, propsImage]);

  const onPressDeleteImage = useCallback(() => {
    propsDeleteImage(image);
  }, [image, propsDeleteImage]);

  return (
    <TouchableOpacity onPress={onPressImage} style={[styles.container, style]}>
      <Image source={{ uri: image.imageUrl }} style={styles.image} />
      <Icon style={styles.closeIcon} onPress={onPressDeleteImage}>
        <MaterialCommunityIcons
          size={moderateScale(28)}
          color={theme.colors.primary}
          name='close-circle'
        />
      </Icon>
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
    right: moderateScale(-10),
    top: moderateScale(-10),
    zIndex: 10,
  },
});

export default React.memo(ThumbnailListItem);
