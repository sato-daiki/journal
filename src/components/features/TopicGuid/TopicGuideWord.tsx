import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import I18n from '@/utils/I18n';
import { WordParams } from './interface';
import Header from './Header';
import { AppText, Space } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';

interface Props {
  params: WordParams;
}

const TopicGuideWord: React.FC<Props> = ({ params }) => {
  const theme = useAppTheme();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Header title={I18n.t('topicGuide.word')} />
      <AppText size='l' bold>{`📖 ${params.title}`}</AppText>
      <Space size={8} />
      {params.words.map((word) => (
        <View key={word.id} style={styles.marginBottom}>
          <AppText size='m' style={styles.text}>{`${word.learnText}`}</AppText>
          <Space size={2} />
          <AppText
            size='m'
            color={theme.colors.secondary}
          >{`${word.nativeText}`}</AppText>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  text: {
    flexWrap: 'wrap',
  },
  marginBottom: {
    marginBottom: 12,
  },
});

export default TopicGuideWord;
