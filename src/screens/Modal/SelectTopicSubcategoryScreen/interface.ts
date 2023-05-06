import { TopicCategory, TopicSubcategory } from '@/types';
import { ImageSourcePropType } from 'react-native';

export type CallerTopicGuide = 'PostDiary' | 'SelectTopicSubcategory';

export interface TopicSubcategoryInfo {
  topicCategory: TopicCategory;
  topicSubcategory: TopicSubcategory;
  nativeTitle: string;
  learnTitle: string;
  source: ImageSourcePropType;
}
