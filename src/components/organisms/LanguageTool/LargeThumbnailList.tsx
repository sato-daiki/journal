import React from 'react';
import { StyleSheet, View, Image, ScrollView, Pressable } from 'react-native';
import { ImageInfo } from '@/types/diary';

interface Props {
  images: ImageInfo[];
  onPress: (index: number) => void;
}

const IMAGE_WIDTH = 128;

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH,
    marginRight: 16,
    borderRadius: 8,
  },
});

const LargeThumbnailList: React.FC<Props> = ({ images, onPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {images.map((image, index) => (
          <Pressable key={index} onPress={() => onPress(index)}>
            <Image style={styles.image} source={{ uri: image.imageUrl }} />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};

export default LargeThumbnailList;
