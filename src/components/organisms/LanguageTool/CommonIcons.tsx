import React from 'react';
import { StyleSheet, View } from 'react-native';
import { primaryColor } from '@/styles/Common';
import { HoverableIcon } from '@/components/atoms';

interface Props {
  onPressSpeech: () => void;
  onPressCopy: () => void;
  onPressShare?: () => void;
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  icon: {
    marginLeft: 16,
  },
});

const CommonIcons: React.FC<Props> = ({
  onPressSpeech,
  onPressCopy,
  onPressShare,
}) => {
  return (
    <View style={styles.iconContainer}>
      {onPressShare && (
        <HoverableIcon
          icon='feather'
          name='share'
          size={18}
          color={primaryColor}
          onPress={onPressShare}
        />
      )}
      <HoverableIcon
        style={styles.icon}
        icon='community'
        name='volume-high'
        size={18}
        color={primaryColor}
        onPress={onPressSpeech}
      />
      <HoverableIcon
        style={styles.icon}
        icon='community'
        name='content-copy'
        size={18}
        color={primaryColor}
        onPress={onPressCopy}
      />
    </View>
  );
};

export default CommonIcons;
