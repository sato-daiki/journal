import React, { useMemo } from 'react';
import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { View, StyleSheet, Text } from 'react-native';
import { Hoverable, HoverableIcon, Icon } from '../../atoms';
import * as Linking from 'expo-linking';

interface Props {
  color: string;
  activeText: string;
  shortMessage?: string;
  message?: string;
  urls?: { value: string }[];
  replacements: { value: string }[];
  onPressIgnore: () => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: borderLightColor,
    borderRadius: 4,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  shortMessage: {
    fontSize: fontSizeM,
    alignItems: 'center',
    fontWeight: 'bold',
    color: subTextColor,
  },

  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  baseWord: {
    textDecorationLine: 'line-through',
  },
  right: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginHorizontal: 6,
  },
  replacementContaienr: {
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  replacement: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
  or: {
    fontSize: fontSizeM,
    color: subTextColor,
    marginLeft: 8,
  },

  message: {
    marginTop: 8,
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
  },

  bottomRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomRowleft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  urlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  iconInfo: {
    marginRight: 4,
  },
  learn: {
    fontSize: fontSizeM,
    color: subTextColor,
  },
});

export const Card: React.FC<Props> = ({
  color,
  activeText,
  shortMessage,
  message,
  urls,
  replacements,
  onPressIgnore,
}) => {
  const onPressInfo = (value: string) => {
    Linking.openURL(value);
  };

  const filterReplacements = useMemo(
    // replacementsが多すぎる時があるため
    () => replacements.filter((_v, i) => i < 5),
    [replacements],
  );

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.firstRow}>
          <View style={[styles.circle, { backgroundColor: color }]} />
          <Text style={styles.shortMessage}>{shortMessage}</Text>
        </View>
        <View style={styles.secondRow}>
          <Text style={[styles.baseWord, { color: color }]}>{activeText}</Text>
          <Text style={styles.right}>→</Text>
          {filterReplacements.map((replacement, index) => (
            <View key={index} style={styles.replacementContaienr}>
              <Text style={styles.replacement}>{replacement.value}</Text>
              {index !== filterReplacements.length - 1 && (
                <Text style={styles.or}>or</Text>
              )}
            </View>
          ))}
        </View>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.bottomRowleft}>
          {urls &&
            urls.map((url, index) => (
              <Hoverable
                key={index}
                style={styles.urlContainer}
                onPress={() => onPressInfo(url.value)}
              >
                <View style={styles.iconInfo}>
                  <Icon
                    color={subTextColor}
                    icon='community'
                    name='information-outline'
                    size={18}
                  />
                </View>
                <Text style={styles.learn}>Learn more</Text>
              </Hoverable>
            ))}
        </View>
        <HoverableIcon
          icon='feather'
          name='trash-2'
          color={primaryColor}
          size={24}
          onPress={onPressIgnore}
        />
      </View>
    </View>
  );
};
