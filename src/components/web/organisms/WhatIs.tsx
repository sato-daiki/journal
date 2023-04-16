import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { App } from '../../../images/web';
import I18n from '../../../utils/I18n';
import { getImage } from '../../../utils/web';
import { Title, BodyText } from '../atoms';
import WebTemplate from '../template/WebTemplate';

interface Props {
  isMaxLayoutChange: boolean;
  isMobileDevice: boolean;
  options?: I18n.TranslateOptions;
}

const styles = StyleSheet.create({
  warapper: {
    paddingTop: 32,
  },
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
  image: {
    width: 300,
    height: 300,
  },
});

const WhatIs = ({ isMaxLayoutChange, isMobileDevice, options }: Props) => {
  const source = getImage('correct');
  const renderLeft = source ? (
    <Image resizeMode='contain' style={styles.image} source={source} />
  ) : (
    <View />
  );

  const renderRight = (
    <>
      <View style={styles.row}>
        <Image source={App} resizeMode='contain' style={styles.icon} />
        <Title
          isMobileDevice={isMobileDevice}
          text={I18n.t('web.wahtTitle', options)}
        />
      </View>
      <BodyText
        isMobileDevice={isMobileDevice}
        text={I18n.t('web.wahtText1', options)}
      />
      <BodyText
        isMobileDevice={isMobileDevice}
        text={I18n.t('web.wahtText2', options)}
      />
    </>
  );

  return (
    <WebTemplate
      warapper={styles.warapper}
      leftTop={false}
      isMaxLayoutChange={isMaxLayoutChange}
      renderLeft={renderLeft}
      renderRight={renderRight}
    />
  );
};

export default WhatIs;
