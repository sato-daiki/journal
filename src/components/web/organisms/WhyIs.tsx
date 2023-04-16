import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { primaryColor } from '../../../styles/Common';
import { Giar, Pen } from '../../../images/web';
import WebTemplate from '../template/WebTemplate';
import I18n from '../../../utils/I18n';
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
  chatText: {
    fontSize: 18,
    color: primaryColor,
    lineHeight: 18 * 1.3,
  },
  rowChat: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 16,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 8,
  },
});

const WhyIs = ({ isMaxLayoutChange, isMobileDevice, options }: Props) => {
  const imageStyle = {
    width: isMaxLayoutChange ? 150 : 75,
    height: isMaxLayoutChange ? 150 : 75,
  };
  const renderLeft = (
    <>
      <View style={styles.row}>
        <Image source={Pen} resizeMode='contain' style={styles.icon} />
        <Title isMobileDevice={isMobileDevice} text={I18n.t('web.whyTitle', options)} />
      </View>
      <BodyText isMobileDevice={isMobileDevice} text={I18n.t('web.whyText', options)} />
    </>
  );

  const renderRight = (
    <View style={styles.rowChat}>
      <View style={styles.textContainer}>
        <Text style={styles.chatText}>{I18n.t('web.whyCnatText1', options)}</Text>
        <Text style={styles.chatText}>{I18n.t('web.whyCnatText2', options)}</Text>
        <Text style={styles.chatText}>{I18n.t('web.whyCnatText3', options)}</Text>
      </View>
      <View>
        <Image resizeMode='cover' style={imageStyle} source={Giar} />
      </View>
    </View>
  );

  return (
    <WebTemplate
      leftTop
      isMaxLayoutChange={isMaxLayoutChange}
      renderLeft={renderLeft}
      renderRight={renderRight}
    />
  );
};

export default WhyIs;
