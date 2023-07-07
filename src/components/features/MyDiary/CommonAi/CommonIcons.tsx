import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { Icon } from '@/components/templates';

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
  const theme = useAppTheme();
  return (
    <View style={styles.iconContainer}>
      {onPressShare && (
        <Icon onPress={onPressShare}>
          <Feather name='share' size={18} color={theme.colors.primary} />
        </Icon>
      )}
      <Icon onPress={onPressSpeech}>
        <MaterialCommunityIcons
          style={styles.icon}
          name='volume-high'
          size={18}
          color={theme.colors.primary}
        />
      </Icon>
      <Icon onPress={onPressCopy}>
        <MaterialCommunityIcons
          style={styles.icon}
          name='content-copy'
          color={theme.colors.primary}
          size={18}
        />
      </Icon>
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
