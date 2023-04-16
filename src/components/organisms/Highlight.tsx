import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { connectHighlight } from 'react-instantsearch-native';
import { softRed } from '../../styles/Common';

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    color: softRed,
  },
});

// TODO: typescriptの記載方法がわからない
const Highlight = ({ highlight, attribute, hit, numberOfLines, textStyle }) => {
  const parsedHit = highlight({
    attribute,
    hit,
    highlightProperty: '_highlightResult',
  });
  const highligtedHit = parsedHit.map((part: any, index: number) => {
    if (part.isHighlighted) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={index} style={styles.text}>
          {part.value}
        </Text>
      );
    }
    return part.value;
  });

  return (
    <Text style={textStyle} ellipsizeMode="tail" numberOfLines={numberOfLines}>
      {highligtedHit}
    </Text>
  );
};

export default connectHighlight(Highlight);
