import React, { ReactNode, useCallback, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LongCode, ThemeCategory, ThemeSubcategory } from '@/types';
import { LinkText, Space } from '@/components/atoms';
import CommonSmallPill from '../../molecules/CommonSmallPill';
import I18n from '@/utils/I18n';
import * as Clipboard from 'expo-clipboard';
import * as Linking from 'expo-linking';
import Toast from 'react-native-root-toast';
import ModalSpeech from '../ModalSpeech';
import CommonIcons from './CommonIcons';
import { fontSizeS, subTextColor } from '@/styles/Common';
import { AiName, getWhatUrl } from '@/utils/grammarCheck';

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
  describeAi: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
  linkText: {
    fontSize: fontSizeS,
  },
  perfect: {
    color: subTextColor,
    fontSize: fontSizeS,
  },
  textLength: {
    alignSelf: 'flex-end',
    color: subTextColor,
    fontSize: fontSizeS,
  },
});

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
      <Text style={styles.textLength}>
        {I18n.t('postDiaryComponent.textLength')}
        {` ${text.length}`}
      </Text>
      {isPerfect && (
        <>
          <Space size={16} />
          <Text style={styles.perfect}>※{I18n.t('myDiary.perfect')}</Text>
        </>
      )}
      {!!aiName && (
        <>
          <Space size={16} />
          <View style={styles.row}>
            <Text style={styles.describeAi}>
              {I18n.t('myDiary.describeAi1')}
            </Text>
            <LinkText
              textStyle={styles.linkText}
              onPress={onPressWhat}
              text={aiName}
            />
            <Text style={styles.describeAi}>
              {I18n.t('myDiary.describeAi2')}
            </Text>
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

export default CommonDiaryTitleAndText;
