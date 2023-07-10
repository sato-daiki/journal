import React from 'react';
import { StyleSheet, View, Image, ScrollView, Pressable } from 'react-native';
import { ImageInfo } from '@/types/diary';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

interface Props {
  images: ImageInfo[];
  onPress: (index: number) => void;
}

const IMAGE_WIDTH = 128;

const LargeThumbnailList: React.FC<Props> = ({ images, onPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.row}>
        {images.map((image, index) => (
          <Pressable key={index} onPress={() => onPress(index)}>
            <Image style={styles.image} source={{ uri: image.imageUrl }} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(IMAGE_WIDTH),
    height: moderateScale(IMAGE_WIDTH),
    marginRight: horizontalScale(16),
    borderRadius: moderateScale(8),
  },
});

export default LargeThumbnailList;
