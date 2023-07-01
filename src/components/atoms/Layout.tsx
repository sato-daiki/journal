import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
  View,
} from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
} & ViewProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerStyle: {
    flex: 1,
  },
});

const Layout = ({ style, innerStyle, children, ...props }: Props) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.background,
        },
        style,
      ]}
      {...props}
    >
      <View style={[styles.innerStyle, innerStyle]}>{children}</View>
    </SafeAreaView>
  );
};

export default React.memo(Layout);
