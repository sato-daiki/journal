import React, { useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {
  fontSizeL,
  fontSizeLL,
  fontSizeM,
  primaryColor,
} from '@/styles/Common';
import { HoverableIcon } from '@/components/atoms';

interface Porps {
  disabled?: boolean;
  title: string;
  passcode: string;
  message?: string;
  setPasscode: (passcode: string) => void;
  onCheck: (passcode: string) => Promise<boolean>;
}

const DOT_CIRCLE_WIDTH = 10;
const DOT_CIRCLE_MARGIN = 8;

const NUM_CIRCLE_WIDTH = 60;
const NUM_CIRCLE_MARGIN = 12;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeL,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  message: {
    color: primaryColor,
    fontSize: fontSizeM,
    marginBottom: 16,
    textAlign: 'center',
  },
  dotRow: {
    flexDirection: 'row',
    marginBottom: 48,
  },
  dot: {
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: DOT_CIRCLE_WIDTH / 2,
    width: DOT_CIRCLE_WIDTH,
    height: DOT_CIRCLE_WIDTH,
    marginHorizontal: DOT_CIRCLE_MARGIN,
  },
  dotFill: {
    backgroundColor: primaryColor,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  dummyContainer: {
    width: NUM_CIRCLE_WIDTH,
    marginHorizontal: NUM_CIRCLE_MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numContainer: {
    borderColor: primaryColor,
    borderWidth: 1,
    borderRadius: NUM_CIRCLE_WIDTH / 2,
    width: NUM_CIRCLE_WIDTH,
    height: NUM_CIRCLE_WIDTH,
    marginHorizontal: NUM_CIRCLE_MARGIN,
    alignItems: 'center',
    justifyContent: 'center',
  },
  num: {
    fontSize: fontSizeLL,
    color: primaryColor,
  },
});

const PasscodeLock: React.FC<Porps> = ({
  disabled,
  title,
  passcode,
  message,
  onCheck,
  setPasscode,
}) => {
  const animation = useRef(new Animated.Value(0));

  const triggerAnimation = useCallback(() => {
    animation.current.setValue(0);
    Animated.timing(animation.current, {
      duration: 400,
      toValue: 3,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressNum = useCallback(
    async (num) => {
      const newPasscode = passcode + num;
      setPasscode(newPasscode);

      if (newPasscode.length === 4) {
        const result = await onCheck(newPasscode);
        if (!result) {
          setTimeout(() => {
            triggerAnimation();
            setPasscode('');
          }, 200);
        }
      }
    },
    [onCheck, passcode, setPasscode, triggerAnimation],
  );

  const onPressCler = useCallback(() => {
    if (passcode.length > 0) {
      const newPasscode = passcode.slice(0, -1);
      setPasscode(newPasscode);
    }
  }, [passcode, setPasscode]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      <Animated.View
        style={{
          transform: [
            {
              translateX: animation.current.interpolate({
                inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                outputRange: [0, -15, 0, 15, 0, -15, 0],
              }),
            },
          ],
        }}
      >
        <View style={styles.dotRow}>
          {['1', '2', '3', '4'].map((dot, i) => (
            <View
              key={dot}
              style={[styles.dot, i < passcode.length && styles.dotFill]}
            />
          ))}
        </View>
      </Animated.View>

      {[
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['null', '0', 'clear'],
      ].map((nums, i) => (
        <View style={styles.row} key={i}>
          {nums.map((num) => {
            if (num === 'null') {
              return <View style={styles.dummyContainer} key={num} />;
            } else if (num === 'clear') {
              return (
                <TouchableOpacity
                  key={num}
                  disabled={disabled}
                  style={styles.dummyContainer}
                  onPress={() => onPressCler()}
                >
                  <HoverableIcon
                    icon='feather'
                    name={'delete'}
                    size={32}
                    color={primaryColor}
                  />
                </TouchableOpacity>
              );
            }
            return (
              <TouchableOpacity
                key={num}
                disabled={disabled}
                style={styles.numContainer}
                onPress={() => onPressNum(num)}
              >
                <Text style={styles.num}>{num}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};
export default PasscodeLock;
