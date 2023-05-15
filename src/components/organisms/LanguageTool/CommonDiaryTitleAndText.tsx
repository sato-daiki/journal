import React, { ReactNode, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LongCode, ThemeCategory, ThemeSubcategory } from '@/types';
import { Space } from '@/components/atoms';
import CommonSmallPill from '../../molecules/CommonSmallPill';
import I18n from '@/utils/I18n';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';
import ModalSpeech from '../ModalSpeech';
import CommonIcons from './CommonIcons';

interface Props {
  title: string;
  text: string;
  longCode: LongCode;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleComponent: ReactNode;
  textComponent: ReactNode;
  onPressShare: () => void;
}

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
    paddingBottom: 8,
  },
});

const CommonDiaryTitleAndText: React.FC<Props> = ({
  title,
  text,
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
      position: Toast.positions.TOP,
    });
  }, [title]);

  const onPressTextCopy = useCallback(async () => {
    await Clipboard.setStringAsync(text);
    Toast.show(I18n.t('myDiary.copiedText'), {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
  }, [text]);

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
      <CommonIcons
        onPressSpeech={() => setVisibleSpeech('text')}
        onPressCopy={onPressTextCopy}
        onPressShare={onPressShare}
      />
      <Space size={16} />
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
