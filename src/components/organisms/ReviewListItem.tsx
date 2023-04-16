import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import {
  fontSizeS,
  fontSizeM,
  primaryColor,
  borderLightColor,
  subTextColor,
} from '../../styles/Common';
import { getDay } from '../../utils/time';
import { Review, Language } from '../../types';
import { ProfileIconHorizontal, Space } from '../atoms';
import RichText from './RichText';

interface Props {
  item: Review;
  nativeLanguage?: Language;
  textLanguage: Language;
  handlePressUser: (uid: string, userName: string) => void;
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: borderLightColor,
  },
  postDayText: {
    color: subTextColor,
    fontSize: fontSizeS,
    paddingBottom: 4,
  },
  comment: {
    paddingTop: 4,
    color: primaryColor,
    fontSize: fontSizeM,
    lineHeight: fontSizeM * 1.3,
  },
  rating: {
    alignItems: 'flex-start',
    paddingBottom: 4,
  },
  starStyle: {
    margin: 0,
  },
});

const ReviewListItem = ({ item, nativeLanguage, textLanguage, handlePressUser }: Props) => {
  const { rating, createdAt, comment, reviewer } = item;

  const onPressUser = useCallback(() => {
    handlePressUser(reviewer.uid, reviewer.userName);
  }, [handlePressUser, reviewer.uid, reviewer.userName]);

  return (
    <View style={styles.container}>
      <Text style={styles.postDayText}>{getDay(createdAt)}</Text>
      <View style={styles.rating}>
        <AirbnbRating
          isDisabled
          defaultRating={rating}
          showRating={false}
          count={5}
          size={14}
          starStyle={styles.starStyle}
        />
      </View>
      <RichText
        style={styles.comment}
        text={comment}
        nativeLanguage={nativeLanguage}
        textLanguage={textLanguage}
      />
      <Space size={16} />
      <ProfileIconHorizontal
        userName={reviewer.userName}
        photoUrl={reviewer.photoUrl}
        nativeLanguage={reviewer.nativeLanguage}
        nationalityCode={reviewer.nationalityCode}
        onPress={onPressUser}
      />
    </View>
  );
};

export default React.memo(ReviewListItem);
