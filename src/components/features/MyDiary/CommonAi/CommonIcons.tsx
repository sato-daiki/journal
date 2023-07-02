import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from '@/components/atoms';

interface Props {
  onPressSpeech: () => void;
  onPressCopy: () => void;
  onPressShare?: () => void;
}

const CommonIcons: React.FC<Props> = ({
  onPressSpeech,
  onPressCopy,
  onPressShare,
}) => {
  return (
    <View style={styles.iconContainer}>
      {onPressShare && (
        <Icon icon='feather' name='share' size={18} onPress={onPressShare} />
      )}
      <Icon
        style={styles.icon}
        icon='community'
        name='volume-high'
        size={18}
        onPress={onPressSpeech}
      />
      <Icon
        style={styles.icon}
        icon='community'
        name='content-copy'
        size={18}
        onPress={onPressCopy}
      />
    </View>
  );
};

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

export default CommonIcons;
