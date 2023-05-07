import React from 'react';
import { Text, StyleSheet, ScrollView, View } from 'react-native';
import {
  fontSizeL,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import I18n from '@/utils/I18n';
import { WordParams } from './interface';
import Header from './Header';

interface Props {
  params: WordParams;
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  marginBottom: {
    marginBottom: 12,
  },
  subText: {
    color: subTextColor,
  },
});

const TopicGuideWord: React.FC<Props> = ({ params }) => {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Header title={I18n.t('topicGuide.word')} />
      <Text style={styles.title}>{`📖 ${params.title}`}</Text>
      {params.words.map((word) => (
        <View key={word.id} style={styles.marginBottom}>
          <Text style={styles.text}>{`${word.learnText}`}</Text>
          <Text style={styles.subText}>{`${word.nativeText}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TopicGuideWord;
