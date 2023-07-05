import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

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
        <Feather name='share' size={18} onPress={onPressShare} />
      )}
      <MaterialCommunityIcons
        style={styles.icon}
        name='volume-high'
        size={18}
        onPress={onPressSpeech}
      />
      <MaterialCommunityIcons
        style={styles.icon}
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
