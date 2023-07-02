import React from 'react';
import { StyleSheet, View, Image, ScrollView, Pressable } from 'react-native';
import { ImageInfo } from '@/types/diary';

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
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginRight: 16,
    borderRadius: 8,
  },
});

export default LargeThumbnailList;
