import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
} from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
} & ViewProps;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Layout = ({ style, children, ...props }: Props) => {
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
      {children}
    </SafeAreaView>
  );
};

export default React.memo(Layout);
