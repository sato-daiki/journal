import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { primaryColor } from '../../../styles/Common';
import { Sample } from '../../../images/web';
import WebTemplate from '../template/WebTemplate';
import I18n from '../../../utils/I18n';
import { getImage } from '../../../utils/web';
import { Title, BodyText } from '../atoms';

interface Props {
  isMaxLayoutChange: boolean;
  isMobileDevice: boolean;
  options?: I18n.TranslateOptions;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    color: primaryColor,
    fontWeight: 'bold',
    lineHeight: 32 * 1.3,
  },
  text: {
    fontSize: 20,
    color: primaryColor,
    lineHeight: 20 * 1.3,
  },
  titleDetail: {
    fontSize: 20,
    color: primaryColor,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textDetail: {
    fontSize: 16,
    color: primaryColor,
    lineHeight: 16 * 1.3,
    marginBottom: 8,
  },
  image: {
    width: 320,
    height: 200,
    marginBottom: 16,
  },
  paddingBottom0: {
    paddingBottom: 0,
  },
  paddingHorizontal0: {
    paddingHorizontal: 0,
  },
});

const Example = ({ isMaxLayoutChange, isMobileDevice, options }: Props) => {
  const renderTopCenter = (
    <>
      <View style={styles.row}>
        <Image source={Sample} resizeMode='contain' style={styles.icon} />
        <Title isMobileDevice={isMobileDevice} text={I18n.t('web.exampleTitle', options)} />
      </View>
      <BodyText isMobileDevice={isMobileDevice} text={I18n.t('web.exampleText', options)} />
    </>
  );

  const entry = getImage('entry');
  const renderLeft = entry ? (
    <>
      <Text style={styles.titleDetail}>{I18n.t('web.exampleDetailTitle1', options)}</Text>
      <Text style={styles.textDetail}>{I18n.t('web.exampleDetailText1', options)}</Text>
      <Image resizeMode='contain' source={entry} style={styles.image} />
    </>
  ) : null;

  const comment = getImage('comment');
  const renderCenter = comment ? (
    <>
      <Text style={styles.titleDetail}>{I18n.t('web.exampleDetailTitle2', options)}</Text>
      <Text style={styles.textDetail}>{I18n.t('web.exampleDetailText2', options)}</Text>
      <Image resizeMode='contain' source={comment} style={styles.image} />
    </>
  ) : null;

  const summary = getImage('summary');
  const renderRight = summary ? (
    <>
      <Text style={styles.titleDetail}>{I18n.t('web.exampleDetailTitle3', options)}</Text>
      <Text style={styles.textDetail}>{I18n.t('web.exampleDetailText3', options)}</Text>
      <Image resizeMode='contain' source={summary} style={styles.image} />
    </>
  ) : null;

  return (
    <>
      <WebTemplate
        leftTop
        isMaxLayoutChange={isMaxLayoutChange}
        renderCenter={renderTopCenter}
        container={{ paddingBottom: 0 }}
      />
      <WebTemplate
        leftTop
        isMaxLayoutChange={isMaxLayoutChange}
        renderLeft={renderLeft}
        renderCenter={renderCenter}
        renderRight={renderRight}
        leftContainer={styles.paddingHorizontal0}
        centerContainer={styles.paddingHorizontal0}
        rightContainer={styles.paddingHorizontal0}
      />
    </>
  );
};

export default Example;
