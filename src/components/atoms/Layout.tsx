import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ViewProps,
  View,
} from 'react-native';
import BottomBanner from '../molecules/BottomBanner';
import { useAppTheme } from '@/styles/colors';

type Props = {
  style?: StyleProp<ViewStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  showBottomAd?: boolean;
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

const Layout = ({
  style,
  innerStyle,
  showBottomAd,
  children,
  ...props
}: Props) => {
  const theme = useAppTheme();
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
      {showBottomAd && <BottomBanner />}
    </SafeAreaView>
  );
};

export default React.memo(Layout);
