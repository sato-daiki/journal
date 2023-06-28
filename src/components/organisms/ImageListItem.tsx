import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';

interface Props {
  imageUrl: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const screenWidth = Dimensions.get('window').width;

const ImageListItem: React.FC<Props> = ({ imageUrl }) => {
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    Image.getSize(imageUrl, (width, height) => {
      const scaleFactor = width / screenWidth;
      const imageHeight = height / scaleFactor;
      setImgWidth(screenWidth);
      setImgHeight(imageHeight);
    });
  }, [imageUrl]);

  return (
    <View style={styles.container}>
      <Image
        style={{ width: imgWidth, height: imgHeight }}
        source={{ uri: imageUrl }}
      />
    </View>
  );
};

export default ImageListItem;
