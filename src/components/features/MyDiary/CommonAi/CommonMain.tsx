import React, { ReactNode, useCallback, useState } from 'react';
import { StyleSheet, View, ScrollView, Dimensions } from 'react-native';
import ViewShot from 'react-native-view-shot';
import ImageView from 'react-native-image-viewing';
import { Diary } from '../../../../types';
import { Space, ImageViewFooter } from '@/components';
import DiaryHeader from '@/components/features/MyDiary/DiaryHeader';
import DiaryFooter from '@/components/features/MyDiary/DiaryFooter';
import ImageItem from './ImageItem';
import LargeThumbnailList from './LargeThumbnailList';
import { useAppTheme } from '@/styles/colors';
import { horizontalScale, verticalScale } from '@/styles/metrics';

export interface Props {
  viewShotRef?: React.MutableRefObject<ViewShot | null>;
  isPremium?: boolean;
  isFullImage?: boolean;
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
const IMAGE_WIDTH = Dimensions.get('window').width - horizontalScale(32);

const CommonMain: React.FC<Props> = ({
  viewShotRef,
  isPremium,
  isFullImage,
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
  const theme = useAppTheme();
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
            style={{
              paddingTop: verticalScale(12),
              backgroundColor: theme.colors.background,
            }}
            ref={viewShotRef}
            options={{ format: 'jpg', quality: 0.9 }}
          >
            <View style={styles.mainContainer}>
              <DiaryHeader diary={diary} />
              {titleAndText}
              <Space size={16} />
              {diary.images && diary.images.length > 0 && (
                <>
                  {isFullImage ? (
                    diary.images?.map((image, index) => (
                      <ImageItem
                        key={index}
                        index={index}
                        style={styles.image}
                        width={IMAGE_WIDTH}
                        imageUrl={image.imageUrl}
                        onPress={onPressImage}
                      />
                    ))
                  ) : (
                    <LargeThumbnailList
                      images={diary.images}
                      onPress={onPressImage}
                    />
                  )}
                </>
              )}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    paddingHorizontal: horizontalScale(16),
  },
  scrollView: {
    flex: 1,
  },
  image: {
    marginBottom: verticalScale(8),
  },
});

export default CommonMain;
