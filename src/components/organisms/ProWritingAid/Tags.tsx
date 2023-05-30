import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Tag } from '@/types';
import { Card } from '@/components/organisms/Card/Card';
import { getProWritingAidColors } from '@/utils/grammarCheck';
import CardHeader from '../Card/CardHeader';
import { styles } from '../LanguageTool/Matches';

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
        shortMessage={tag.categoryDisplayName}
        message={tag.hint}
        urls={
          tag.urls &&
          tag.urls.map((url) => {
            return {
              value: url,
            };
          })
        }
        replacements={tag.suggestions.map((suggestion) => {
          return {
            value: suggestion,
          };
        })}
        onPressIgnore={onPressIgnore}
      />
    </View>
  );
};

export default Tags;
