import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import I18n from '@/utils/I18n';
import { AppText, Icon } from '@/components';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { borderLight, useAppTheme } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

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
              <Icon onPress={() => onPressCopy(replacement.value)}>
                <MaterialCommunityIcons
                  size={moderateScale(18)}
                  color={theme.colors.primary}
                  name='content-copy'
                />
              </Icon>
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
                    size={moderateScale(18)}
                    color={theme.colors.secondary}
                    name='information-outline'
                  />
                </View>
                <AppText size='m' color={theme.colors.secondary}>
                  Learn more
                </AppText>
              </TouchableOpacity>
            ))}
        </View>
        {onPressIgnore && (
          <Icon onPress={onPressIgnore}>
            <Feather
              size={moderateScale(24)}
              color={theme.colors.primary}
              name='trash-2'
            />
          </Icon>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: verticalScale(20),
    paddingHorizontal: horizontalScale(8),
    marginHorizontal: horizontalScale(8),
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    paddingTop: verticalScale(12),
    minHeight: verticalScale(176),
    justifyContent: 'space-between',
    borderColor: borderLight,
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: verticalScale(8),
  },
  circle: {
    width: horizontalScale(8),
    height: verticalScale(8),
    borderRadius: moderateScale(4),
    marginRight: horizontalScale(12),
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
    marginHorizontal: horizontalScale(6),
  },
  replacementContaienr: {
    marginRight: horizontalScale(8),
    marginBottom: verticalScale(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  replacement: {
    marginRight: horizontalScale(2),
  },
  or: {
    marginLeft: horizontalScale(8),
  },
  message: {
    marginTop: verticalScale(8),
  },
  bottomRow: {
    marginTop: verticalScale(8),
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
    marginRight: horizontalScale(16),
  },
  iconInfo: {
    marginRight: horizontalScale(4),
  },
});
