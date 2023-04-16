import React, { useCallback } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Linking from 'expo-linking';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { maxLayoutChange, offBlack, offWhite } from '../../../styles/Common';
import { Hoverable } from '../../atoms';
import I18n from '../../../utils/I18n';

interface Props {
  isMobileDevice: boolean;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: offBlack,
  },
  container: {
    width: '100%',
    maxWidth: maxLayoutChange,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  right: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
  textSmall: {
    fontSize: 12,
    color: offWhite,
    alignSelf: 'center',
  },
  textMiddle: {
    marginRight: 16,
    marginBottom: 8,
    fontSize: 16,
    color: offWhite,
    alignSelf: 'center',
  },
});

const Fotter = ({ isMobileDevice }: Props) => {
  const onPressEnglishBlog = useCallback((): void => {
    Linking.openURL('https://interchao.medium.com/');
  }, []);

  const onPressJapaneseBlog = useCallback((): void => {
    Linking.openURL('https://note.com/interchao');
  }, []);

  const onPressTwitter = useCallback((): void => {
    Linking.openURL('https://twitter.com/interchao');
  }, []);

  const onPressOperator = useCallback((): void => {
    Linking.openURL('https://daiki-portfolio.com');
  }, []);

  return (
    <View style={styles.warapper}>
      <View style={[styles.container]}>
        <View style={styles.row}>
          <Text style={styles.textSmall}>©2022 Interchao</Text>
          <View
            style={[
              styles.right,
              { flexDirection: isMobileDevice ? 'column' : 'row' },
            ]}
          >
            <Hoverable onPress={onPressEnglishBlog}>
              <Text style={styles.textMiddle}>English Blog</Text>
            </Hoverable>
            <Hoverable onPress={onPressJapaneseBlog}>
              <Text style={styles.textMiddle}>Japanese Blog</Text>
            </Hoverable>
            <Hoverable onPress={onPressOperator}>
              <Text style={styles.textMiddle}>{I18n.t('web.operator')}</Text>
            </Hoverable>
            <Hoverable onPress={onPressTwitter}>
              <MaterialCommunityIcons
                size={28}
                color={offWhite}
                name='twitter'
                style={{ marginBottom: 8 }}
              />
            </Hoverable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Fotter;
