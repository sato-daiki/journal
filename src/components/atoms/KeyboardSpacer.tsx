// https://github.com/Andr3wHur5t/react-native-keyboard-spacer/* eslint-disable react/static-property-placement */
// このソースを丸々コピーしてきた
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  LayoutAnimation,
  View,
  Dimensions,
  Platform,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = ViewProps & {};

const styles = StyleSheet.create({
  container: {
    left: 0,
    right: 0,
    bottom: 0,
  },
});

// From: https://medium.com/man-moon/writing-modern-react-native-ui-e317ff956f02
const defaultAnimation = {
  duration: 500,
  create: {
    duration: 300,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.spring,
    springDamping: 200,
  },
};

const KeyboardSpacer: React.FC<Props> = ({ style }) => {
  const insets = useSafeAreaInsets();
  const [keyboardSpace, setKeyboardSpace] = useState<number>(0);

  const updateKeyboardSpace = (event) => {
    if (!event.endCoordinates) {
      return;
    }

    let animationConfig: any = defaultAnimation;
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    const screenHeight = Dimensions.get('window').height;
    const newKeyboardSpace = screenHeight - event.endCoordinates.screenY;

    setKeyboardSpace(newKeyboardSpace);
  };

  const resetKeyboardSpace = (event) => {
    let animationConfig: any = defaultAnimation;
    if (Platform.OS === 'ios') {
      animationConfig = LayoutAnimation.create(
        event.duration,
        LayoutAnimation.Types[event.easing],
        LayoutAnimation.Properties.opacity,
      );
    }
    LayoutAnimation.configureNext(animationConfig);

    setKeyboardSpace(0);
  };

  useEffect(() => {
    const updateListener =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const updateSubscription = Keyboard.addListener(
      updateListener,
      updateKeyboardSpace,
    );
    const resetSubscription = Keyboard.addListener(
      resetListener,
      resetKeyboardSpace,
    );

    // cleanup function
    return (): void => {
      updateSubscription.remove();
      resetSubscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View
      style={[
        styles.container,
        { height: keyboardSpace - insets.bottom },
        style,
      ]}
    />
  );
};

export default React.memo(KeyboardSpacer);
