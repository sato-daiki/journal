import React, { useCallback } from 'react';
import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Hoverable, HoverableIcon, Icon } from '../../atoms';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import I18n from '@/utils/I18n';

interface Props {
  skipFirstRow?: boolean;
  color: string;
  activeText?: string;
  shortMessage: string | null;
  message?: string;
  urls?: { value: string }[] | null;
  replacements: { value: string }[];
  onPressIgnore?: () => void;
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderColor: borderLightColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 12,
    backgroundColor: '#fff',
    minHeight: 176,
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
    alignItems: 'center',
  },
  replacement: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
    marginRight: 2,
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
  skipFirstRow,
  color,
  activeText,
  shortMessage,
  message,
  urls,
  replacements,
  onPressIgnore,
}) => {
  const onPressCopy = useCallback(async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show(I18n.t('myDiary.copied'), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
  }, []);

  const onPressInfo = useCallback((value: string) => {
    Linking.openURL(value);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        {!skipFirstRow && (
          <View style={styles.firstRow}>
            <View style={[styles.circle, { backgroundColor: color }]} />
            <Text style={styles.shortMessage}>{shortMessage}</Text>
          </View>
        )}
        <View style={styles.secondRow}>
          {activeText && (
            <>
              <Text style={[styles.baseWord, { color: color }]}>
                {activeText}
              </Text>
              <Text style={styles.right}>→</Text>
            </>
          )}
          {replacements.map((replacement, index) => (
            <View key={index} style={styles.replacementContaienr}>
              <Text style={styles.replacement}>{replacement.value}</Text>
              <HoverableIcon
                icon='community'
                name='content-copy'
                size={18}
                color={primaryColor}
                onPress={() => onPressCopy(replacement.value)}
              />
              {index !== replacements.length - 1 && (
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
        {onPressIgnore && (
          <HoverableIcon
            icon='feather'
            name='trash-2'
            color={primaryColor}
            size={24}
            onPress={onPressIgnore}
          />
        )}
      </View>
    </ScrollView>
  );
};
