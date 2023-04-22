import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  mainColor,
} from '@/styles/Common';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HoverableIcon } from '../../atoms';
import { Match } from '@/types';

interface Props {
  match: Match;
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
    bottom: -7,
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
  replacement: {
    color: '#fff',
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

export const Matche: React.FC<Props> = ({ match }) => {
  const onPressInfo = (value: string) => {};

  return (
    <View style={styles.container}>
      <View style={styles.firstRow}>
        <View style={[styles.circle, { backgroundColor: 'red' }]} />
        <Text style={styles.shortMessage}>{match.shortMessage}</Text>
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.message}>
          {match.message}
          {!!match.urls && (
            <View style={styles.iconRow}>
              {match.urls.map((url, index) => (
                <HoverableIcon
                  key={index}
                  style={styles.infoIcon}
                  icon='community'
                  name='information-outline'
                  size={17}
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
      </View>
    </View>
  );
};
