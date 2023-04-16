import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSizeM, subTextColor, offWhite } from '../../styles/Common';
import { getEachOS } from '../../utils/common';
import { Hoverable } from '../atoms';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    paddingVertical: getEachOS({ ios: 0, android: 0, web: 4 }),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: offWhite,
    borderRadius: 18,
    paddingHorizontal: 16,
    marginVertical: getEachOS({ ios: 8, android: 12, web: 0 }),
    marginLeft: 0,
  },
  icon: {
    paddingRight: 4,
  },
  label: {
    color: subTextColor,
    fontSize: fontSizeM,
  },
});

interface Props {
  title?: string;
  onPress: () => void;
}

const SearchBarButton: React.FC<Props> = ({ title, onPress }) => {
  return (
    <Hoverable style={styles.button} onPress={onPress}>
      <View style={styles.icon}>
        <MaterialCommunityIcons color={subTextColor} size={18} name="magnify" />
      </View>
      <Text style={styles.label} numberOfLines={1}>
        {title}
      </Text>
    </Hoverable>
  );
};

export default SearchBarButton;
