import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import I18n from '@/utils/I18n';
import { TipParams } from './interface';
import Header from './Header';
import { getStyle } from './util';
import { AppText, Space } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';
import { horizontalScale, verticalScale } from '@/styles/metrics';

interface Props {
  params: TipParams;
}

const TopicGuideTip: React.FC<Props> = ({ params }) => {
  const theme = useAppTheme();
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <Header title={I18n.t('topicGuide.guideTipTitle')} />
      <AppText size='l' bold>
        {`⭐️ ${I18n.t('topicGuide.expression')}`}
      </AppText>
      <Space size={8} />
      {params.expressions.map((expression) => (
        <View key={expression.id} style={[styles.marginBottom12, styles.row]}>
          <AppText
            size='m'
            style={styles.text}
          >{`  (${expression.learnText})`}</AppText>
          <AppText
            size='m'
            color={theme.colors.secondary}
          >{`  (${expression.nativeText})`}</AppText>
        </View>
      ))}
      <Space size={16} />

      <AppText size='l' bold>{`✍️ ${I18n.t('topicGuide.example')}`}</AppText>
      <Space size={8} />
      {params.examples.map((example) => (
        <View key={example.id} style={styles.marginBottom12}>
          <AppText size='m' style={[styles.text, styles.marginBottom4]}>
            {example.learnText.map((t) => (
              <AppText
                size='m'
                key={`${example.id}-${t.key}`}
                style={[getStyle(t.styleType)]}
              >
                {`${t.text}`}
              </AppText>
            ))}
          </AppText>
          <AppText
            size='m'
            color={theme.colors.secondary}
          >{`${example.nativeText}`}</AppText>
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
    paddingHorizontal: horizontalScale(16),
    paddingTop: verticalScale(16),
  },
  text: {
    flexWrap: 'wrap',
    marginBottom: verticalScale(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  marginBottom4: {
    marginBottom: verticalScale(4),
  },
  marginBottom12: {
    marginBottom: verticalScale(12),
  },
});

export default TopicGuideTip;
