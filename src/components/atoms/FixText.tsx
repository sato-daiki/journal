import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { fontSizeM, green } from '../../styles/Common';
import { Diff } from '../../types';

interface Props {
  diffs: Diff[];
}

const styles = StyleSheet.create({
  added: {
    fontSize: fontSizeM,
    color: green,
  },
});

const FixText: React.FC<Props> = ({ diffs }: Props) => {
  const diffText = diffs.map((part: Diff, id: number) => {
    if (part.added) {
      return (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={id} style={styles.added}>
          {part.value}
        </Text>
      );
    }
    if (part.removed) {
      return null;
    }
    // eslint-disable-next-line react/no-array-index-key
    return <Text key={id}>{part.value}</Text>;
  });
  return <>{diffText}</>;
};

export default React.memo(FixText);
