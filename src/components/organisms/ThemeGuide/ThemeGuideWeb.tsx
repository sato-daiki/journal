import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
} from 'react-native';

import { Heading, HoverableIcon, SubmitButton } from '@/components/atoms';
import {
  getEntries,
  getStyle,
  IntroductionParams,
  TipParams,
  WordParams,
} from '@/components/organisms/ThemeGuide';

import {
  fontSizeL,
  fontSizeM,
  primaryColor,
  subTextColor,
} from '@/styles/Common';
import I18n from '@/utils/I18n';
import { Language, ThemeCategory, ThemeSubcategory } from '@/types';

interface Props {
  themeCategory: ThemeCategory;
  themeSubcategory: ThemeSubcategory;
  nativeLanguage: Language;
  learnLanguage: Language;
  onPressClose: () => void;
  onPressBegin: () => void;
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    height: height - 150,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 64,
  },
  close: {
    position: 'absolute',
    top: 32,
    zIndex: 100,
  },
  section: {
    marginBottom: 56,
  },
  heading: {
    marginBottom: 24,
  },
  imageIntroductionParams: {
    marginTop: 16,
    alignSelf: 'center',
    width: 80,
    height: 80,
    marginBottom: 32,
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
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  marginBottom12: {
    marginBottom: 12,
  },
  marginLeft16: {
    marginLeft: 16,
  },
  subTextColor: {
    color: subTextColor,
  },
});

const ThemeGuideWeb: React.FC<Props> = ({
  themeCategory,
  themeSubcategory,
  onPressClose,
  onPressBegin,
  learnLanguage,
  nativeLanguage,
}) => {
  const entries =
    getEntries({
      themeCategory,
      themeSubcategory,
      nativeLanguage,
      learnLanguage,
    }) || [];
  if (!entries) return <View />;

  const introductionParams = entries[0].params as IntroductionParams;
  const tipParams = entries[1].params as TipParams;
  const wordParams = entries[2].params as WordParams;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <HoverableIcon
          icon="community"
          name="close"
          size={24}
          style={styles.close}
          onPress={onPressClose}
        />
        <View style={styles.section}>
          <Heading
            title={I18n.t('themeGuide.introduction')}
            containerStyle={styles.heading}
          />
          <Image
            source={introductionParams.source}
            style={styles.imageIntroductionParams}
          />
          <Text style={[styles.text, styles.textAlignCenter]}>
            {introductionParams.text}
          </Text>
        </View>

        <View style={styles.section}>
          <Heading
            title={I18n.t('themeGuide.guideTipTitle')}
            containerStyle={styles.heading}
          />
          <Text style={styles.title}>{I18n.t('themeGuide.expression')}</Text>
          {tipParams.expressions.map(expression => (
            <Text
              key={expression.id}
              style={[styles.text, styles.marginBottom12]}
            >
              {`・${expression.learnText}`}
              <Text style={[styles.subTextColor, styles.marginLeft16]}>
                {`（${expression.nativeText}）`}
              </Text>
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>{I18n.t('themeGuide.example')}</Text>
          {tipParams.examples.map(example => (
            <Text key={example.id} style={[styles.text, styles.marginBottom12]}>
              ・
              {example.learnText.map(t => (
                <Text
                  key={`${example.id}-${t.key}`}
                  style={[getStyle(t.styleType)]}
                >
                  {`${t.text}`}
                </Text>
              ))}
              <Text style={[styles.subTextColor, styles.marginLeft16]}>
                {` - ${example.nativeText}`}
              </Text>
            </Text>
          ))}
        </View>

        <View style={styles.section}>
          <Heading
            title={I18n.t('themeGuide.word')}
            containerStyle={styles.heading}
          />
          <Text style={styles.title}>{`${wordParams.title}`}</Text>
          {wordParams.words.map(word => (
            <Text key={word.id} style={[styles.text, styles.marginBottom12]}>
              {`・${word.learnText}`}
              <Text style={[styles.subTextColor, styles.marginLeft16]}>
                {` - ${word.nativeText}`}
              </Text>
            </Text>
          ))}
        </View>

        <SubmitButton title={I18n.t('common.begin')} onPress={onPressBegin} />
      </ScrollView>
    </View>
  );
};

export default ThemeGuideWeb;
