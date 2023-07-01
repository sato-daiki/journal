import * as React from 'react';
import { View, ViewProps, ViewStyle, StyleProp } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomBanner from '../molecules/BottomBanner';
import {
  ScrollViewWithRefresh,
  ScrollViewWithRefreshProps,
} from './ScrollViewWithRefresh';

type Props = ViewProps & {
  scrollViewProps?: ScrollViewWithRefreshProps;
  innerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle;
  disableScroll?: boolean;
  enableSafeArea?: boolean;
  showBottomAd?: boolean;
};

export const Layout2: React.FC<Props> = React.memo(
  ({
    innerStyle,
    innerContainerStyle,
    disableScroll = false,
    enableSafeArea = false,
    showBottomAd = false,
    children,
    style,
    // avoidViewProps,
    scrollViewProps,
    ...passProps
  }) => {
    const insets = useSafeAreaInsets();
    const safeStyle = {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    };
    const innerStyles: StyleProp<ViewStyle> = [
      enableSafeArea ? safeStyle : undefined,
      { flex: 1, backgroundColor: '#fff' },
      innerStyle,
    ];

    return (
      <View style={[{ flex: 1 }, style]} {...passProps}>
        {disableScroll ? (
          <View style={innerStyles}>{children}</View>
        ) : (
          <ScrollViewWithRefresh
            contentContainerStyle={[{ flexGrow: 1 }, innerContainerStyle]}
            refreshing={scrollViewProps?.refreshing || false}
            {...scrollViewProps}
          >
            <View style={innerStyles}>{children}</View>
          </ScrollViewWithRefresh>
        )}
        {showBottomAd && <BottomBanner />}
      </View>
    );
  },
);

Layout2.displayName = 'Layout2';
