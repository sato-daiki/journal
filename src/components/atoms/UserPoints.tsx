import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fontSizeS, primaryColor, subTextColor } from '../../styles/Common';
import { Points } from '../../images';
import I18n from '../../utils/I18n';

interface Props {
  points: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 14,
    height: 14,
  },
  label: {
    fontSize: fontSizeS,
    color: subTextColor,
    paddingLeft: 4,
    paddingRight: 16,
  },
  points: {
    fontSize: fontSizeS,
    color: primaryColor,
  },
});

const UserPoints: React.FC<Props> = ({ points }: Props) => {
  const text = `${points}P`;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={Points} />
      <Text style={styles.label}>{I18n.t('userPoints.points')}</Text>
      <Text style={styles.points}>{text}</Text>
    </View>
  );
};

export default React.memo(UserPoints);
