import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { primaryColor, fontSizeM } from '../../styles/Common';
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
    width: 24,
    height: 24,
    tintColor: primaryColor,
    marginBottom: 2,
  },
  label: {
    fontSize: fontSizeM,
    color: primaryColor,
    paddingLeft: 4,
    paddingRight: 16,
  },
  points: {
    fontSize: fontSizeM,
    color: primaryColor,
  },
});

const UserPointsBig: React.FC<Props> = ({ points }: Props) => {
  const text = `${points}P`;
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={Points} />
      <Text style={styles.label}>{I18n.t('userPointsBig.points')}</Text>
      <Text style={styles.points}>{text}</Text>
    </View>
  );
};

export default React.memo(UserPointsBig);
