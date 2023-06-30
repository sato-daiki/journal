import React, { ReactNode, useCallback } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
} from 'react-native-tab-view';
import { fontSizeM, mainColor, subTextColor } from '../../styles/Common';

type Props = SceneRendererProps & {
  navigationState: NavigationState<{
    key: string;
    title: string;
  }>;
};

const { width } = Dimensions.get('window');

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
    backgroundColor: mainColor,
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
      tabStyle={{
        width: Math.max(width / props.navigationState.routes.length, 100),
      }}
      scrollEnabled
      style={styles.container}
      renderLabel={renderLabel}
      indicatorStyle={styles.indicatorStyle}
      activeColor={mainColor}
      inactiveColor={subTextColor}
    />
  );
};

export default MyDiaryTabBar;
