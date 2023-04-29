import React, { useMemo } from 'react';
import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  mainColor,
  offWhite,
} from '@/styles/Common';
import { View, StyleSheet, Text } from 'react-native';
import { Hoverable, HoverableIcon } from '../atoms';
import { Match } from '@/types';
import * as Linking from 'expo-linking';
import I18n from '@/utils/I18n';
import { getColors } from '@/utils/spellChecker';

interface Props {
  match: Match;
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
    fontWeight: 'bold',
  },
  secondRow: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  message: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoIcon: {
    bottom: -7.5,
    height: 26,
  },
  thirdRow: {
    flexDirection: 'row',
  },
  replacementContaienr: {
    backgroundColor: mainColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  ignoreContaienr: {
    backgroundColor: offWhite,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  replacement: {
    color: '#fff',
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
  ignore: {
    fontSize: fontSizeM,
  },
});

export const Matche: React.FC<Props> = ({ match, onPressIgnore }) => {
  const { color } = useMemo(() => {
    return getColors(match);
  }, [match]);

  const onPressInfo = (value: string) => {
    Linking.openURL(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={[styles.circle, { backgroundColor: color }]} />
        <Text style={styles.shortMessage}>
          {match.shortMessage || match.rule?.issueType}
        </Text>
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.message}>
          {match.message}
          {!!match.rule?.urls && (
            <View style={styles.iconRow}>
              {match.rule.urls.map((url, index) => (
                <HoverableIcon
                  key={index}
                  style={styles.infoIcon}
                  icon='community'
                  name='information-outline'
                  size={18}
                  onPress={() => onPressInfo(url.value)}
                />
              ))}
            </View>
          )}
        </Text>
      </View>
      <View style={styles.thirdRow}>
        {match.replacements.map((replacement, index) => (
          <View key={index} style={styles.replacementContaienr}>
            <Text style={styles.replacement}>{replacement.value}</Text>
          </View>
        ))}
        <Hoverable style={styles.ignoreContaienr} onPress={onPressIgnore}>
          <Text style={styles.ignore}>{I18n.t('myDiary.ignore')}</Text>
        </Hoverable>
      </View>
    </View>
  );
};