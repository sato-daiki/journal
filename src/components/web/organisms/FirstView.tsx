import React, { useMemo } from 'react';
import { View, StyleSheet, Text, StyleProp, TextStyle } from 'react-native';
import {
  maxLayoutChange,
  offBlack,
  maxPartS,
  fontSizeLL,
  fontSizeL,
  fontSizeTitle,
} from '../../../styles/Common';
import { WhiteButton, Space, SubmitButton } from '../../atoms';
import I18n from '../../../utils/I18n';
import { getSize } from '../../../utils/responsibleCss';

interface Props {
  isAbout: boolean;
  isMaxLayoutChange: boolean;
  isMobileDevice: boolean;
  onPressStart?: () => void;
  onPressLogin?: () => void;
  options?: I18n.TranslateOptions;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: offBlack,
  },
  container: {
    width: '100%',
    maxWidth: maxLayoutChange,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 32,
  },
  containerPc: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerSp: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingBottom: 80,
  },
  textContainer: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  loginContainer: {
    maxWidth: 300,
    alignItems: 'flex-start',
    width: maxPartS,
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    color: '#fff',
  },
  loginText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    alignSelf: 'flex-start',
  },
});

const FirstView = ({
  isAbout,
  isMaxLayoutChange,
  isMobileDevice,
  onPressStart,
  onPressLogin,
  options,
}: Props) => {
  const leftStyle = useMemo((): StyleProp<TextStyle> => {
    return {
      alignSelf: isMaxLayoutChange ? 'flex-start' : 'center',
      textAlign: isMaxLayoutChange ? 'left' : 'center',
    };
  }, [isMaxLayoutChange]);

  const rightStyle = useMemo((): StyleProp<TextStyle> => {
    return {
      alignSelf: isMaxLayoutChange ? 'flex-start' : 'center',
    };
  }, [isMaxLayoutChange]);

  return (
    <View style={styles.warapper}>
      <View
        style={[
          styles.container,
          isMaxLayoutChange ? styles.containerPc : styles.containerSp,
        ]}
      >
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              {
                fontSize: getSize(isMobileDevice, fontSizeTitle),
                lineHeight: getSize(isMobileDevice, fontSizeTitle) * 1.3,
              },
              leftStyle,
            ]}
          >
            {I18n.t('web.firstViewTitle', options)}
          </Text>
          <Text
            style={[
              styles.text,
              {
                fontSize: getSize(isMobileDevice, fontSizeLL),
                lineHeight: getSize(isMobileDevice, fontSizeLL) * 1.3,
              },
              leftStyle,
            ]}
          >
            {I18n.t('web.firstViewSubTitle', options)}
          </Text>
        </View>
        {isAbout ? null : (
          <View style={styles.loginContainer}>
            <Space size={36} />
            <Text
              style={[
                styles.loginText,
                {
                  fontSize: getSize(isMobileDevice, fontSizeL),
                  lineHeight: getSize(isMobileDevice, fontSizeL) * 1.3,
                },
                rightStyle,
              ]}
            >
              {I18n.t('web.firstViewStart', options)}
            </Text>
            <Space size={8} />
            <SubmitButton
              containerStyle={styles.button}
              title={I18n.t('initialize.start', options)}
              onPress={onPressStart}
            />
            <Space size={16} />
            <WhiteButton
              containerStyle={styles.button}
              title={I18n.t('signIn.login', options)}
              onPress={onPressLogin}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default FirstView;
