import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
// @ts-ignore
import { ALGOLIA_API_KEY, ALGOLIA_ADMIN_API_KEY } from '@env';
import { getIndexName } from './common';

type SortType = 'createdAt' | 'updatedAt';

export const getClient = (): SearchClient => {
  return algoliasearch('QFAU3ALJR1', 'e0ee910fde8e29ae51e4c9b0c4e66145');
};

class Algolia {
  private client: SearchClient;

  private isProd = false;

  constructor() {
    this.client = getClient();

    if (__DEV__) {
      this.isProd = false;
    } else {
      this.isProd = true;
    }
  }

  public getDiaryIndex = async (): Promise<SearchIndex> => {
    this.client.clearCache();
    return this.client.initIndex(getIndexName());
  };

  public setSettings = async (
    index: SearchIndex,
    sortType: SortType = 'createdAt',
  ): Promise<void> => {
    if (sortType === 'createdAt') {
      await index.setSettings({
        ranking: [
          'desc(createdAt._seconds)',
          'typo',
          'geo',
          'words',
          'filters',
          'proximity',
          'attribute',
          'exact',
          'custom',
        ],
      });
    } else if (sortType === 'updatedAt') {
      await index.setSettings({
        ranking: [
          'desc(updatedAt._seconds)',
          'typo',
          'geo',
          'words',
          'filters',
          'proximity',
          'attribute',
          'exact',
          'custom',
        ],
      });
    }
  };
}

let instance: Algolia | null = null;

const AlgoliaClient = (): Algolia => {
  if (!instance) {
    instance = new Algolia();
  }
  return instance;
};

export default AlgoliaClient();
