import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import I18n from '@/utils/I18n';
import { AppText } from '@/components';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { borderLight, useAppTheme } from '@/styles/colors';

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

export const CardMain: React.FC<Props> = ({
  skipFirstRow,
  color,
  activeText,
  shortMessage,
  message,
  urls,
  replacements,
  onPressIgnore,
}) => {
  const theme = useAppTheme();
  const onPressCopy = useCallback(async (text: string) => {
    await Clipboard.setStringAsync(text);
    Toast.show(I18n.t('myDiary.copied'), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
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
            <AppText
              size='m'
              bold
              color={theme.colors.secondary}
              textAlign='center'
            >
              {shortMessage}
            </AppText>
          </View>
        )}
        <View style={styles.secondRow}>
          {activeText && (
            <>
              <AppText size='m' style={[styles.baseWord, { color: color }]}>
                {activeText}
              </AppText>
              <AppText
                size='m'
                color={theme.colors.secondary}
                style={styles.right}
              >
                →
              </AppText>
            </>
          )}
          {replacements.map((replacement, index) => (
            <View key={index} style={styles.replacementContaienr}>
              <AppText size='m' bold style={styles.replacement}>
                {replacement.value}
              </AppText>
              <MaterialCommunityIcons
                name='content-copy'
                size={18}
                color={theme.colors.primary}
                onPress={() => onPressCopy(replacement.value)}
              />
              {index !== replacements.length - 1 && (
                <AppText
                  size='m'
                  color={theme.colors.secondary}
                  style={styles.or}
                >
                  or
                </AppText>
              )}
            </View>
          ))}
        </View>
        {message && (
          <AppText size='s' style={styles.message}>
            {message}
          </AppText>
        )}
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.bottomRowleft}>
          {urls &&
            urls.map((url, index) => (
              <TouchableOpacity
                key={index}
                style={styles.urlContainer}
                onPress={() => onPressInfo(url.value)}
              >
                <View style={styles.iconInfo}>
                  <MaterialCommunityIcons
                    color={theme.colors.secondary}
                    name='information-outline'
                    size={18}
                  />
                </View>
                <AppText size='m' color={theme.colors.secondary}>
                  Learn more
                </AppText>
              </TouchableOpacity>
            ))}
        </View>
        {onPressIgnore && (
          <Feather
            name='trash-2'
            size={24}
            color={theme.colors.primary}
            onPress={onPressIgnore}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 20,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderRadius: 8,
    paddingTop: 12,
    minHeight: 176,
    justifyContent: 'space-between',
    borderColor: borderLight,
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
  secondRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  baseWord: {
    textDecorationLine: 'line-through',
  },
  right: {
    marginHorizontal: 6,
  },
  replacementContaienr: {
    marginRight: 8,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  replacement: {
    marginRight: 2,
  },
  or: {
    marginLeft: 8,
  },
  message: {
    marginTop: 8,
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
});
