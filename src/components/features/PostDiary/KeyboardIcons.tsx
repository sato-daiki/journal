import React, { useMemo } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import { MAX_IMAGE_NUM } from '@/constants/common';
import { ImageInfo } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { Icon } from '@/components';

type Props = {
  images: ImageInfo[] | null | undefined;
  onPressChooseImage: () => void;
  onPressCamera: () => void;
};

const KeyboardIcons: React.FC<Props> = ({
  images,
  onPressChooseImage,
  onPressCamera,
}) => {
  const theme = useAppTheme();

  const isAddImage = useMemo(() => {
    if (!images) return true;
    if (images.length < MAX_IMAGE_NUM) return true;
    return false;
  }, [images]);

  return (
    <View style={styles.keybordRow}>
      <View style={styles.keybordLeftRow}>
        <Icon onPress={onPressChooseImage} disabled={!isAddImage}>
          <MaterialCommunityIcons
            style={[styles.icon, !isAddImage && { opacity: 0.3 }]}
            name='file-image-outline'
            size={24}
            color={theme.colors.main}
          />
        </Icon>
        <Icon onPress={onPressCamera} disabled={!isAddImage}>
          <MaterialCommunityIcons
            style={!isAddImage && { opacity: 0.3 }}
            name='camera-outline'
            size={24}
            color={theme.colors.main}
          />
        </Icon>
      </View>
      <Icon onPress={Keyboard.dismiss}>
        <MaterialCommunityIcons
          name='keyboard-close'
          size={24}
          color={theme.colors.main}
        />
      </Icon>
    </View>
  );
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

export default KeyboardIcons;
