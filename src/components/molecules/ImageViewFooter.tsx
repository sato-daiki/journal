import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useAppTheme, white } from '@/styles/colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

export interface Props {
  total: number;
  imageIndex: number;
}

const ImageViewFooter: React.FC<Props> = ({ total, imageIndex }) => {
  const theme = useAppTheme();

  if (total < 2) return null;
  return (
    <SafeAreaView>
      <View>
        <View style={styles.row}>
          {[...Array(total)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    imageIndex === i ? white : theme.colors.secondary,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  row: {
    position: 'absolute',
    bottom: verticalScale(80),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: moderateScale(10),
    width: moderateScale(10),
    marginHorizontal: horizontalScale(6),
    borderRadius: moderateScale(5),
  },
});

export default ImageViewFooter;
