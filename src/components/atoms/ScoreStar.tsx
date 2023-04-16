import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Star } from '../../images';
import { fontSizeS, primaryColor, star, subTextColor } from '../../styles/Common';
import I18n from '../../utils/I18n';

interface Props {
  score: number;
  reviewNum: number;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 13,
    height: 13,
    tintColor: star,
    marginRight: 2,
  },
  zeroText: {
    fontSize: fontSizeS,
    color: subTextColor,
  },
  score: {
    fontSize: fontSizeS,
    color: primaryColor,
    paddingRight: 2,
  },
  reviewNum: {
    fontSize: fontSizeS,
    color: primaryColor,
  },
});

const ScoreStar: React.FC<Props> = ({ score, reviewNum }: Props) => {
  if (score === 0) {
    return <Text style={styles.zeroText}>{I18n.t('emptyReview.empty')}</Text>;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.score}>{score}</Text>
      <Image style={styles.img} source={Star} />
      <Text style={styles.reviewNum}>{`(${reviewNum})`}</Text>
    </View>
  );
};

export default React.memo(ScoreStar);
