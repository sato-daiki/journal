import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextButtun } from '@/components/atoms';
import { offWhite } from '@/styles/Common';
import I18n from '@/utils/I18n';

interface Props {
  isTopic: boolean;
  onPressTopicGuide: () => void;
  onPressDraft?: () => void;
  onPressMyDiary?: () => void;
}

export const FOOTER_HEIGHT = 80;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    height: FOOTER_HEIGHT,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: offWhite,
  },
});

const Footer: React.FC<Props> = ({
  isTopic,
  onPressTopicGuide,
  onPressDraft,
  onPressMyDiary,
}) => {
  return (
    <View style={styles.footer}>
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

export default Footer;
