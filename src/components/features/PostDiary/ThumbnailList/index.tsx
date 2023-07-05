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
import { useAppTheme } from '@/styles/colors';

interface Props {
  style?: StyleProp<ViewStyle>;
  isImageLoading: boolean;
  images?: ImageInfo[] | null;
  onPressImage: (index: number) => void;
  onPressDeleteImage: (image: ImageInfo) => void;
}

const ThumbnailList: React.FC<Props> = ({
  style,
  isImageLoading,
  images,
  onPressImage,
  onPressDeleteImage,
}) => {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
        style,
      ]}
    >
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
      {isImageLoading && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator color={theme.colors.secondary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIndicator: {
    width: THUMBNAIL_WIDTH,
    height: THUMBNAIL_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
});

export default ThumbnailList;
