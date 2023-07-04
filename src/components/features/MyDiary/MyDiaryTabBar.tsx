import React, { ReactNode, useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';
import { AppText } from '@/components/atoms';
import { borderLight, useAppTheme } from '@/styles/colors';

type Props = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
};

const { width } = Dimensions.get('window');

const MyDiaryTabBar: React.FC<Props> = (props) => {
  const theme = useAppTheme();
  const renderLabel = useCallback(
    ({ route, color }): ReactNode => (
      <View style={styles.labelContainer}>
        <AppText size='m' style={[styles.labelText, { color }]}>
          {route.title}
        </AppText>
      </View>
    ),
    [],
  );

  return (
    <TabBar
      {...props}
      tabStyle={{
        width: Math.max(width / props.navigationState.routes.length, 100),
      }}
      scrollEnabled
      style={{
        backgroundColor: theme.colors.background,
        borderBottomColor: borderLight,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
      renderLabel={renderLabel}
      indicatorStyle={{ backgroundColor: theme.colors.main }}
      activeColor={theme.colors.main}
      inactiveColor={theme.colors.secondary}
    />
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    marginLeft: 4,
  },
});

export default MyDiaryTabBar;
