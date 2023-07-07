import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useAppTheme } from '@/styles/colors';
import { Icon } from '@/components/templates';
import { horizontalScale, moderateScale } from '@/styles/metrics';

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
          <Feather
            size={moderateScale(18)}
            color={theme.colors.primary}
            name='share'
          />
        </Icon>
      )}
      <Icon onPress={onPressSpeech}>
        <MaterialCommunityIcons
          style={styles.icon}
          size={moderateScale(18)}
          color={theme.colors.primary}
          name='volume-high'
        />
      </Icon>
      <Icon onPress={onPressCopy}>
        <MaterialCommunityIcons
          style={styles.icon}
          size={moderateScale(18)}
          color={theme.colors.primary}
          name='content-copy'
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
    marginLeft: horizontalScale(16),
  },
});

export default CommonIcons;
