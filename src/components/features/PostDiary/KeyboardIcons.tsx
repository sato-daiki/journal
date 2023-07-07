import React, { useMemo } from 'react';
import { StyleSheet, Keyboard, View } from 'react-native';
import { MAX_IMAGE_NUM } from '@/constants/common';
import { ImageInfo } from '@/types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { Icon } from '@/components';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

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
            size={moderateScale(24)}
            color={theme.colors.main}
            name='file-image-outline'
          />
        </Icon>
        <Icon onPress={onPressCamera} disabled={!isAddImage}>
          <MaterialCommunityIcons
            style={!isAddImage && { opacity: 0.3 }}
            size={moderateScale(24)}
            color={theme.colors.main}
            name='camera-outline'
          />
        </Icon>
      </View>
      <Icon onPress={Keyboard.dismiss}>
        <MaterialCommunityIcons
          size={moderateScale(24)}
          color={theme.colors.main}
          name='keyboard-close'
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
    paddingRight: horizontalScale(8),
    paddingLeft: horizontalScale(16),
    paddingVertical: verticalScale(4),
  },
  keybordLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    paddingRight: horizontalScale(16),
  },
});

export default KeyboardIcons;
