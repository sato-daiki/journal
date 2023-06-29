import React, { useCallback, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Diary } from '../../../types';
import CommonMain from '../LanguageTool/CommonMain';
import CommonDiaryTitleAndText from '../LanguageTool/CommonDiaryTitleAndText';
import { Space } from '@/components/atoms';
import ImageItem from './ImageItem';
import ImageView from 'react-native-image-viewing';
import ImageViewFooter from '../ImageViewFooter';
import { styles as commonStyles } from '../LanguageTool/LanguageToolDiaryTitleAndText';

export interface Props {
  diary: Diary;
  title: string;
  text: string;
}

const IMAGE_WIDTH = Dimensions.get('window').width - 32;

const styles = StyleSheet.create({
  image: {
    marginBottom: 8,
  },
});

const Original: React.FC<Props> = ({ diary, title, text }) => {
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
      <CommonMain
        hideFooterButton={true}
        diary={diary}
        text={text}
        titleAndText={
          <View>
            <CommonDiaryTitleAndText
              title={title}
              text={text}
              longCode={diary.longCode}
              themeCategory={diary.themeCategory}
              themeSubcategory={diary.themeSubcategory}
              titleComponent={<Text style={commonStyles.title}>{title}</Text>}
              textComponent={<Text style={commonStyles.text}>{text}</Text>}
            />
            <Space size={16} />
            {diary.images?.map((image, index) => {
              return (
                <ImageItem
                  key={index}
                  index={index}
                  style={styles.image}
                  width={IMAGE_WIDTH}
                  imageUrl={image.imageUrl}
                  onPress={onPressImage}
                />
              );
            })}
          </View>
        }
      />
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

export default Original;
