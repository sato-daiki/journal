import React, { ReactNode, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { fontSizeM, primaryColor } from '@/styles/Common';
import { ThemeCategory, ThemeSubcategory } from '@/types';
import { Icon, SmallButtonWhite, Space } from '@/components/atoms';
import CommonSmallPill from '../../molecules/CommonSmallPill';
import I18n from '@/utils/I18n';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';

interface Props {
  title: string;
  text: string;
  themeCategory?: ThemeCategory | null;
  themeSubcategory?: ThemeSubcategory | null;
  titleComponent: ReactNode;
  textComponent: ReactNode;
}

export const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingTop: 8,
  },
  title: {
    color: primaryColor,
    fontWeight: 'bold',
    fontSize: fontSizeM,
    flex: 1,
  },
  copyTitleButton: {
    marginTop: 8,
    width: 120,
    alignSelf: 'flex-end',
  },
  text: {
    lineHeight: fontSizeM * 1.8,
    fontSize: fontSizeM,
    color: primaryColor,
  },
  copyTextButton: {
    marginTop: 8,
    width: 120,
    alignSelf: 'flex-end',
  },
});

const DiaryTitleAndText: React.FC<Props> = ({
  title,
  text,
  themeCategory,
  themeSubcategory,
  titleComponent,
  textComponent,
}) => {
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
      <SmallButtonWhite
        containerStyle={styles.copyTitleButton}
        icon={
          <Icon
            icon='community'
            name='content-copy'
            size={18}
            color={primaryColor}
          />
        }
        color={primaryColor}
        title={I18n.t('myDiary.copyTitle')}
        onPress={onPressTitleCopy}
      />
      <Space size={16} />
      {textComponent}
      <SmallButtonWhite
        containerStyle={styles.copyTextButton}
        icon={
          <Icon
            icon='community'
            name='content-copy'
            size={18}
            color={primaryColor}
          />
        }
        color={primaryColor}
        title={I18n.t('myDiary.copyText')}
        onPress={onPressTextCopy}
      />
      <Space size={16} />
    </>
  );
};

export default DiaryTitleAndText;
