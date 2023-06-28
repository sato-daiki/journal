import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import ThumbnailListItem, { THUMBNAIL_WIDTH } from './ThumbnailListItem';
import { ImageInfo } from '@/types/diary';
import { borderLightColor } from '@/styles/Common';

interface Props {
  style?: StyleProp<ViewStyle>;
  isImageLoading: boolean;
  images?: ImageInfo[] | null;
  onPressImage: (index: number) => void;
  onPressDeleteImage: (image: ImageInfo) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activityIndicator: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: borderLightColor,
    borderWidth: 1,
    borderRadius: 8,
    marginRight: 4,
  },
});

const ThumbnailList: React.FC<Props> = ({
  style,
  isImageLoading,
  images,
  onPressImage,
  onPressDeleteImage,
}) => {
  return (
    <View style={[styles.container, style]}>
      {isImageLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator />
        </View>
      )}
      {images?.map((image, index) => (
        <ThumbnailListItem
          key={index}
          style={{ marginRight: 16 }}
          index={index}
          image={image}
          onPressImage={onPressImage}
          onPressDeleteImage={onPressDeleteImage}
        />
      ))}
    </View>
  );
};

export default ThumbnailList;
