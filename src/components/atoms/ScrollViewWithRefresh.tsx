import * as React from 'react';
import { ScrollView, ScrollViewProps, RefreshControl, RefreshControlProps } from 'react-native';

export type ScrollViewWithRefreshProps = ScrollViewProps &
  Pick<RefreshControlProps, 'refreshing' | 'onRefresh'>;

export const ScrollViewWithRefresh: React.FC<ScrollViewWithRefreshProps> = React.memo(
  ({ refreshing, onRefresh, ...passProps }) => {
    const enableRefreshing = !!onRefresh;
    return (
      <ScrollView
        refreshControl={
          enableRefreshing ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
        {...passProps}
      />
    );
  }
);

ScrollViewWithRefresh.displayName = 'ScrollViewWithRefresh';
