import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { offWhite } from '@/styles/Common';
import { Edit } from '@/types';
import { Card } from '@/components/organisms/Card/Card';
import { getSaplingColors } from '@/utils/grammarCheck';
import CardHeader from '../Card/CardHeader';
import { styles } from '../LanguageTool/Matches';

export interface Props {
  edits: Edit[];
  activeIndex: number;
  activeLeft: boolean;
  activeRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressClose: () => void;
  onPressIgnore: () => void;
}

const Edits: React.FC<Props> = ({
  edits,
  activeIndex,
  activeLeft,
  activeRight,
  onPressLeft,
  onPressRight,
  onPressClose,
  onPressIgnore,
}) => {
  const { color } = useMemo(() => {
    return getSaplingColors(edits[activeIndex]);
  }, [activeIndex, edits]);

  const edit = useMemo(() => {
    return edits[activeIndex];
  }, [activeIndex, edits]);

  const activeText = useMemo(() => {
    if (edit.sentence) {
      try {
        return edit.sentence.substring(edit.start, edit.end);
      } catch (err: any) {
        console.warn(err);
        return '';
      }
    }
    return '';
  }, [edit]);

  return (
    <View style={styles.container}>
      <CardHeader
        activeLeft={activeLeft}
        activeRight={activeRight}
        onPressLeft={onPressLeft}
        onPressRight={onPressRight}
        onPressClose={onPressClose}
      />
      <Card
        color={color}
        activeText={activeText}
        shortMessage={edit.general_error_type}
        replacements={[{ value: edit.replacement }]}
        onPressIgnore={onPressIgnore}
      />
    </View>
  );
};

export default Edits;
