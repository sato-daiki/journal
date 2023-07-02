import React, { useCallback, useEffect, useState } from 'react';
import { Image, ImageStyle, Pressable, StyleProp } from 'react-native';

export interface Props {
  style?: StyleProp<ImageStyle>;
  index: number;
  width: number;
  imageUrl: string;
  onPress: (index: number) => void;
}

const ImageItem: React.FC<Props> = ({
  style,
  index,
  width,
  imageUrl,
  onPress: propsPress,
}) => {
  const [imgHeight, setImgHeight] = useState(0);

  useEffect(() => {
    Image.getSize(imageUrl, (w, h) => {
      const scaleFactor = w / width;
      const imageHeight = h / scaleFactor;
      setImgHeight(imageHeight);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPress = useCallback(() => {
    propsPress(index);
  }, [index, propsPress]);

  return (
    <Pressable onPress={onPress}>
      <Image
        style={[{ width: width, height: imgHeight }, style]}
        source={{ uri: imageUrl }}
      />
    </Pressable>
  );
};

export default ImageItem;
