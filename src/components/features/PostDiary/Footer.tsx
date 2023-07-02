import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextButtun } from '@/components/atoms';
import I18n from '@/utils/I18n';
import { useAppTheme } from '@/styles/colors';

interface Props {
  isTopic: boolean;
  onPressTopicGuide: () => void;
  onPressDraft?: () => void;
  onPressMyDiary?: () => void;
}

export const FOOTER_HEIGHT = 80;

const Footer: React.FC<Props> = ({
  isTopic,
  onPressTopicGuide,
  onPressDraft,
  onPressMyDiary,
}) => {
  const theme = useAppTheme();
  return (
    <View
      style={[styles.footer, { backgroundColor: theme.colors.backgroundOff }]}
    >
      {!!onPressMyDiary && (
        <TextButtun
          isBorrderTop
          isBorrderBottom={!onPressDraft && !isTopic}
          title={I18n.t('postDiaryComponent.correct')}
          onPress={onPressMyDiary}
        />
      )}
      {isTopic && (
        <TextButtun
          isBorrderTop
          isBorrderBottom={!onPressDraft}
          title={I18n.t('postDiaryComponent.hint')}
          onPress={onPressTopicGuide}
        />
      )}
      {!!onPressDraft && (
        <TextButtun
          isBorrderTop
          isBorrderBottom
          title={I18n.t('postDiaryComponent.draft')}
          onPress={onPressDraft}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    height: FOOTER_HEIGHT,
    justifyContent: 'flex-end',
    width: '100%',
  },
});

export default Footer;
