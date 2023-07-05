import React, { ReactNode, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LongCode, ThemeCategory, ThemeSubcategory } from '@/types';
import { LinkText, Space, AppText } from '@/components';
import CommonSmallPill from '../../MyDiary/ThemeSmallPill';
import I18n from '@/utils/I18n';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import Toast from 'react-native-root-toast';
import CommonIcons from './CommonIcons';
import { AiName, getWhatUrl } from '@/utils/grammarCheck';
import { useAppTheme } from '@/styles/colors';
import ModalSpeech from '../../Modal/ModalSpeech';

interface Props {
  isPerfect?: boolean;
  title: string;
  text: string;
  aiName?: AiName;
  longCode: LongCode;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleComponent: ReactNode;
  textComponent: ReactNode;
  onPressShare?: () => void;
}

const CommonDiaryTitleAndText: React.FC<Props> = ({
  isPerfect,
  title,
  text,
  aiName,
  longCode,
  themeCategory,
  themeSubcategory,
  titleComponent,
  textComponent,
  onPressShare,
}) => {
  const theme = useAppTheme();
  const [visibleSpeech, setVisibleSpeech] = useState<'title' | 'text' | null>(
    null,
  );

  const onPressTitleCopy = useCallback(async () => {
    await Clipboard.setStringAsync(title);
    Toast.show(I18n.t('myDiary.copiedTitle'), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
    });
  }, [title]);

  const onPressTextCopy = useCallback(async () => {
    await Clipboard.setStringAsync(text);
    Toast.show(I18n.t('myDiary.copiedText'), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.CENTER,
    });
  }, [text]);

  const onPressWhat = useCallback(() => {
    if (!aiName) return;
    const url = getWhatUrl(aiName);
    if (url) {
      Linking.openURL(url);
    }
  }, [aiName]);

  return (
    <>
      <View style={styles.titleContainer}>
        {themeCategory && themeSubcategory && (
          <CommonSmallPill themeCategory={themeCategory} />
        )}
        {titleComponent}
      </View>
      <CommonIcons
        onPressSpeech={() => setVisibleSpeech('title')}
        onPressCopy={onPressTitleCopy}
      />
      <Space size={16} />
      {textComponent}
      <Space size={8} />
      <CommonIcons
        onPressSpeech={() => setVisibleSpeech('text')}
        onPressCopy={onPressTextCopy}
        onPressShare={onPressShare}
      />
      <Space size={16} />
      <AppText
        size='s'
        color={theme.colors.secondary}
        style={styles.textLength}
      >
        {I18n.t('postDiaryComponent.textLength')}
        {` ${text.length}`}
      </AppText>
      {isPerfect && (
        <>
          <Space size={16} />
          <AppText size='s' color={theme.colors.secondary}>
            ※{I18n.t('myDiary.perfect')}
          </AppText>
        </>
      )}
      {!!aiName && (
        <>
          <Space size={16} />
          <View style={styles.row}>
            <AppText size='s' color={theme.colors.secondary}>
              {I18n.t('myDiary.describeAi1')}
            </AppText>
            <LinkText size='s' onPress={onPressWhat} text={aiName} />
            <AppText size='s' color={theme.colors.secondary}>
              {I18n.t('myDiary.describeAi2')}
            </AppText>
          </View>
        </>
      )}
      <ModalSpeech
        visible={!!visibleSpeech}
        text={
          !!visibleSpeech && visibleSpeech === 'title'
            ? title
            : !!visibleSpeech && visibleSpeech === 'text'
            ? text
            : ''
        }
        longCode={longCode}
        onClose={(): void => setVisibleSpeech(null)}
      />
    </>
  );
};

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textLength: {
    alignSelf: 'flex-end',
  },
});

export default CommonDiaryTitleAndText;
