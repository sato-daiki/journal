import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { subTextColor } from '@/styles/Common';

export interface Props {
  total: number;
  imageIndex: number;
}

const ImageViewFooter: React.FC<Props> = ({ total, imageIndex }) => {
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
                { backgroundColor: imageIndex === i ? '#fff' : subTextColor },
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
    bottom: 80,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    marginHorizontal: 6,
    borderRadius: 5,
  },
});

export default ImageViewFooter;
