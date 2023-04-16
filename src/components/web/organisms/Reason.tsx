import React from 'react';
import { StyleSheet, Text, View, Image, ViewProps } from 'react-native';
import { primaryColor } from '../../../styles/Common';
import { Zebra } from '../../../images/web/index';
import WebTemplate from '../template/WebTemplate';
import I18n from '../../../utils/I18n';

interface Props {
  isMaxLayoutChange: boolean;
  options?: I18n.TranslateOptions;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: primaryColor,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textContainer: {
    marginBottom: 32,
  },
  text: {
    fontSize: 16,
    color: primaryColor,
    lineHeight: 16 * 1.3,
    marginBottom: 2,
  },
  image: {
    width: 300,
    height: 300,
  },
});

const Reason = ({ isMaxLayoutChange, options }: Props) => {
  const renderLeft = <Image resizeMode='contain' style={styles.image} source={Zebra} />;

  const textContainer = [
    styles.textContainer,
    { alignSelf: isMaxLayoutChange ? 'flex-start' : 'center' },
    { textAlign: isMaxLayoutChange ? 'left' : 'center' },
  ] as ViewProps;

  const renderRight = (
    <>
      <View style={textContainer}>
        <Text style={styles.title}>{I18n.t('web.reasonTitle1', options)}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText11', options)}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText12', options)}</Text>
      </View>

      <View style={textContainer}>
        <Text style={styles.title}>{I18n.t('web.reasonTitle2', options)}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText21', options)}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText22', options)}</Text>
      </View>

      <View style={textContainer}>
        <Text style={styles.title}>{I18n.t('web.reasonTitle3', options)}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText31', options)}</Text>
        <Text style={styles.text}>{I18n.t('web.reasonText32', options)}</Text>
      </View>
    </>
  );

  return (
    <WebTemplate
      leftTop={false}
      isMaxLayoutChange={isMaxLayoutChange}
      renderLeft={renderLeft}
      renderRight={renderRight}
    />
  );
};

export default Reason;
