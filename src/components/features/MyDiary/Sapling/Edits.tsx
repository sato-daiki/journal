import React, { useMemo } from 'react';
import { Edit } from '@/types';
import { getSaplingColors } from '@/utils/grammarCheck';
import Card from '../CommonAi/Card/Card';
import CardHeader from '../CommonAi/Card/CardHeader';
import { CardMain } from '../CommonAi/Card/CardMain';

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
    <Card
      header={
        <CardHeader
          activeLeft={activeLeft}
          activeRight={activeRight}
          onPressLeft={onPressLeft}
          onPressRight={onPressRight}
          onPressClose={onPressClose}
        />
      }
      main={
        <CardMain
          color={color}
          activeText={activeText}
          shortMessage={edit.general_error_type}
          replacements={[{ value: edit.replacement }]}
          onPressIgnore={onPressIgnore}
        />
      }
    />
  );
};

export default Edits;
