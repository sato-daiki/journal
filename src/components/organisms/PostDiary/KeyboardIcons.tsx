import React, { useMemo } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import { HoverableIcon } from '@/components/atoms';
import { mainColor } from '@/styles/Common';
import { MAX_IMAGE_NUM } from '@/constants/common';
import { ImageInfo } from '@/types';

type Props = {
  images: ImageInfo[] | null | undefined;
  onPressChooseImage: () => void;
  onPressCamera: () => void;
};

const styles = StyleSheet.create({
  keybordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 8,
    paddingLeft: 16,
    paddingVertical: 4,
  },
  keybordLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: 16,
  },
});

const KeyboardIcons: React.FC<Props> = ({
  images,
  onPressChooseImage,
  onPressCamera,
}) => {
  const isAddImage = useMemo(() => {
    if (!images) return true;
    if (images.length < MAX_IMAGE_NUM) return true;
    return false;
  }, [images]);

  return (
    <View style={styles.keybordRow}>
      <View style={styles.keybordLeftRow}>
        <HoverableIcon
          style={[styles.icon, !isAddImage && { opacity: 0.3 }]}
          icon='community'
          name='file-image-outline'
          size={24}
          color={mainColor}
          onPress={isAddImage ? onPressChooseImage : undefined}
        />
        <HoverableIcon
          style={!isAddImage && { opacity: 0.3 }}
          icon='community'
          name='camera-outline'
          size={24}
          color={mainColor}
          onPress={isAddImage ? onPressCamera : undefined}
        />
      </View>
      <HoverableIcon
        icon='community'
        name='keyboard-close'
        size={24}
        color={mainColor}
        onPress={Keyboard.dismiss}
      />
    </View>
  );
};

export default KeyboardIcons;
