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

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 80,
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
  console.log('Fotter', onPressMyDiary);
  return (
    <View style={styles.footer}>
      {!!onPressMyDiary && (
        <TextButtun
          isBorrderTop
          title={I18n.t('postDiaryComponent.correct')}
          onPress={onPressMyDiary}
        />
      )}
      {isTopic && (
        <TextButtun
          isBorrderTop
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
