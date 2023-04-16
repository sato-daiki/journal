import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { PointGet } from '../../../images/web/index';
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
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },
  image: {
    width: 400,
    height: 200,
    marginBottom: 16,
  },
});

const Correct = ({ isMaxLayoutChange, isMobileDevice, options }: Props) => {
  const renderLeft = (
    <>
      <View style={styles.row}>
        <Image source={PointGet} resizeMode='contain' style={styles.icon} />
        <Title isMobileDevice={isMobileDevice} text={I18n.t('web.correctTitle', options)} />
      </View>
      <BodyText isMobileDevice={isMobileDevice} text={I18n.t('web.correctText1', options)} />
    </>
  );

  const source = getImage('girl');
  const renderRight = source ? (
    <Image resizeMode='contain' style={styles.image} source={source} />
  ) : (
    <View />
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

export default Correct;
