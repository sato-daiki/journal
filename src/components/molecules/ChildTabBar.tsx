import React, { ReactNode, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';
import { fontSizeM, primaryColor, subTextColor } from '../../styles/Common';

type Props = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelText: {
    marginLeft: 4,
    fontSize: fontSizeM,
  },
  indicatorStyle: {
    backgroundColor: primaryColor,
  },
});

const MyDiaryTabBar: React.FC<Props> = (props) => {
  const renderLabel = useCallback(
    ({ route, color }): ReactNode => (
      <View style={styles.labelContainer}>
        <Text style={[styles.labelText, { color }]}>{route.title}</Text>
      </View>
    ),
    [],
  );

  return (
    <TabBar
      {...props}
      style={styles.container}
      renderLabel={renderLabel}
      indicatorStyle={styles.indicatorStyle}
      activeColor={primaryColor}
      inactiveColor={subTextColor}
    />
  );
};

export default MyDiaryTabBar;
