import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Zenny, Note } from '../../../images/web/index';
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
  image: {
    width: 300,
    height: 300,
  },
});

const Start = ({ isMaxLayoutChange, isMobileDevice, options }: Props) => {
  const renderRight = <Image resizeMode='contain' style={styles.image} source={Zenny} />;

  const renderLeft = (
    <>
      <View style={styles.row}>
        <Image source={Note} resizeMode='contain' style={styles.icon} />
        <Title isMobileDevice={isMobileDevice} text={I18n.t('web.startTitle', options)} />
      </View>
      <BodyText isMobileDevice={isMobileDevice} text={I18n.t('web.startText', options)} />
    </>
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

export default Start;
