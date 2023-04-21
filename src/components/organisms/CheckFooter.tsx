import {
  borderLightColor,
  fontSizeM,
  fontSizeS,
  mainColor,
  offWhite,
} from '@/styles/Common';
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { HoverableIcon } from '../atoms';

interface Props {
  activeId: number | null;
  setActiveId: (activeId: number | null) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    backgroundColor: offWhite,
    height: 180,
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  icon: {
    paddingLeft: 8,
  },
  innerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderColor: borderLightColor,
    borderRadius: 4,
    backgroundColor: '#fff',
    flex: 1,
  },
  firstRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  shortMessage: {
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
  secondRow: {
    flexDirection: 'row',
    paddingBottom: 8,
  },
  message: {
    fontSize: fontSizeS,
    lineHeight: fontSizeS * 1.3,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoIcon: {
    bottom: -7,
  },
  thirdRow: {
    flexDirection: 'row',
  },
  replacementContaienr: {
    backgroundColor: mainColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
  },
  replacement: {
    color: '#fff',
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const CheckFooter: React.FC<Props> = ({ activeId, setActiveId }) => {
  const onPressLeft = () => {};
  const onPressRight = () => {};
  const onPressClose = () => {};
  const onPressInfo = (url: string) => {};
  const urls = [
    {
      value: 'https://languagetool.org/insights/post/grammar-forms-of-do/',
    },
    {
      value: 'https://languagetool.org/insights/post/grammar-forms-of-do/',
    },
  ];

  const replacements = [
    {
      value: 'exists,',
    },
    {
      value: 'exists,',
    },
    {
      value: 'exists,',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HoverableIcon
          style={styles.icon}
          icon={'community'}
          name={'arrow-left-thin'}
          size={24}
          onPress={onPressLeft}
        />
        <HoverableIcon
          style={styles.icon}
          icon={'community'}
          name={'arrow-right-thin'}
          size={24}
          onPress={onPressRight}
        />
        <HoverableIcon
          style={styles.icon}
          icon='community'
          name='close-circle-outline'
          size={24}
          onPress={onPressClose}
        />
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.firstRow}>
          <View style={[styles.circle, { backgroundColor: 'red' }]} />
          <Text style={styles.shortMessage}>Provider (created by App)</Text>
        </View>
        <View style={styles.secondRow}>
          <Text style={styles.message}>
            The modal verb ‘will’ requires the verb’s base form. The modal verb
            ‘will’ base e res the v
            <View style={styles.iconRow}>
              {urls.map((url, index) => (
                <HoverableIcon
                  key={index}
                  style={styles.infoIcon}
                  icon='community'
                  name='information-outline'
                  size={17}
                  onPress={() => onPressInfo(url)}
                />
              ))}
            </View>
          </Text>
        </View>
        <View style={styles.thirdRow}>
          {replacements.map((replacement, index) => (
            <View key={index} style={styles.replacementContaienr}>
              <Text style={styles.replacement}>{replacement.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default CheckFooter;
