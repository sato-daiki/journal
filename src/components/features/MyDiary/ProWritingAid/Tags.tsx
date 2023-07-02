import React, { useMemo } from 'react';
import { Tag } from '@/types';
import { getProWritingAidColors } from '@/utils/grammarCheck';
import Card from '../CommonAi/Card/Card';
import CardHeader from '../CommonAi/Card/CardHeader';
import { CardMain } from '../CommonAi/Card/CardMain';

export interface Props {
  text: string;
  tags: Tag[];
  activeIndex: number;
  activeLeft: boolean;
  activeRight: boolean;
  onPressLeft: () => void;
  onPressRight: () => void;
  onPressClose: () => void;
  onPressIgnore: () => void;
}

const Tags: React.FC<Props> = ({
  text,
  tags,
  activeIndex,
  activeLeft,
  activeRight,
  onPressLeft,
  onPressRight,
  onPressClose,
  onPressIgnore,
}) => {
  const { color } = useMemo(() => {
    return getProWritingAidColors(tags[activeIndex]);
  }, [activeIndex, tags]);

  const tag = useMemo(() => {
    return tags[activeIndex];
  }, [activeIndex, tags]);

  const activeText = useMemo(() => {
    try {
      return text.substring(tag.startPos, tag.endPos);
    } catch (err: any) {
      console.warn(err);
      return '';
    }
  }, [tag.endPos, tag.startPos, text]);

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
          shortMessage={tag.categoryDisplayName}
          message={tag.hint}
          urls={
            tag.urls &&
            tag.urls.map((url) => ({
              value: url,
            }))
          }
          replacements={tag.suggestions.map((suggestion) => ({
            value: suggestion,
          }))}
          onPressIgnore={onPressIgnore}
        />
      }
    />
  );
};

export default Tags;
