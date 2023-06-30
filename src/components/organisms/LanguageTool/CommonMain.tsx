import React, { ReactNode, useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import ViewShot from 'react-native-view-shot';
import ImageView from 'react-native-image-viewing';
import { Diary } from '../../../types';
import { Space } from '../../atoms';
import DiaryHeader from '@/components/molecules/DiaryHeader';
import DiaryFooter from '@/components/molecules/DiaryFooter';
import ImageItem from './ImageItem';
import ImageViewFooter from '../ImageViewFooter';

export interface Props {
  viewShotRef?: React.MutableRefObject<ViewShot | null>;
  isPremium?: boolean;
  showSaplingCheck?: boolean;
  hideFooterButton: boolean;
  diary: Diary;
  text: string;
  checkPermissions?: () => Promise<boolean>;
  goToRecord?: () => void;
  onPressRevise?: () => void;
  onPressCheck?: () => void;
  onPressAdReward?: () => void;
  onPressBecome?: () => void;
  cardTitle?: ReactNode;
  cardText?: ReactNode;
  titleAndText: ReactNode;
}
const IMAGE_WIDTH = Dimensions.get('window').width - 32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewShot: {
    paddingTop: 12,
    backgroundColor: '#fff',
  },
  mainContainer: {
    paddingHorizontal: 16,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    marginBottom: 8,
  },
});

const CommonMain: React.FC<Props> = ({
  viewShotRef,
  isPremium,
  showSaplingCheck,
  hideFooterButton,
  diary,
  text,
  checkPermissions,
  goToRecord,
  onPressRevise,
  onPressCheck,
  onPressAdReward,
  onPressBecome,
  titleAndText,
  cardTitle,
  cardText,
}) => {
  const [isImageView, setIsImageView] = useState(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const onPressImage = useCallback((index: number) => {
    setIsImageView(true);
    setImageIndex(index);
  }, []);

  const onCloseImageView = useCallback(() => {
    setIsImageView(false);
    setImageIndex(0);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <ViewShot
            style={styles.viewShot}
            ref={viewShotRef}
            options={{ format: 'jpg', quality: 0.9 }}
          >
            <View style={styles.mainContainer}>
              <DiaryHeader diary={diary} />
              {titleAndText}
              <Space size={16} />
              {diary.images?.map((image, index) => (
                <ImageItem
                  key={index}
                  index={index}
                  style={styles.image}
                  width={IMAGE_WIDTH}
                  imageUrl={image.imageUrl}
                  onPress={onPressImage}
                />
              ))}
            </View>
            <DiaryFooter
              isPremium={isPremium}
              hideFooterButton={hideFooterButton}
              showSaplingCheck={showSaplingCheck}
              text={text}
              longCode={diary.longCode}
              voiceUrl={diary.voiceUrl}
              checkPermissions={checkPermissions}
              goToRecord={goToRecord}
              onPressRevise={onPressRevise}
              onPressCheck={onPressCheck}
              onPressAdReward={onPressAdReward}
              onPressBecome={onPressBecome}
            />
          </ViewShot>
          <Space size={32} />
        </ScrollView>
        {cardTitle}
        {cardText}
      </View>
      {diary.images && diary.images.length > 0 && (
        <ImageView
          visible={isImageView}
          images={diary.images.map((i) => ({ uri: i.imageUrl }))}
          imageIndex={imageIndex}
          onRequestClose={onCloseImageView}
          FooterComponent={({ imageIndex }) => (
            <ImageViewFooter
              total={diary.images?.length || 0}
              imageIndex={imageIndex}
            />
          )}
        />
      )}
    </>
  );
};

export default CommonMain;
