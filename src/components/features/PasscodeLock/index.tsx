import React, { useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AppText, Space } from '@/components/atoms';
import { useAppTheme } from '@/styles/colors';
import { Icon } from '@/components/templates';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '@/styles/metrics';

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

const PasscodeLock: React.FC<Porps> = ({
  disabled,
  title,
  passcode,
  message,
  onCheck,
  setPasscode,
}) => {
  const theme = useAppTheme();
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
      <AppText size='l' bold>
        {title}
      </AppText>
      <Space size={16} />
      {message && (
        <>
          <AppText size='m' textAlign='center'>
            {message}
          </AppText>
          <Space size={16} />
        </>
      )}
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
              style={[
                styles.dot,
                { borderColor: theme.colors.primary },
                i < passcode.length && {
                  backgroundColor: theme.colors.primary,
                },
              ]}
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
                <Icon
                  key={num}
                  disabled={disabled}
                  style={styles.dummyContainer}
                  onPress={onPressCler}
                >
                  <Feather
                    size={moderateScale(32)}
                    color={theme.colors.primary}
                    name={'delete'}
                  />
                </Icon>
              );
            }
            return (
              <TouchableOpacity
                key={num}
                disabled={disabled}
                style={[
                  styles.numContainer,
                  {
                    borderColor: theme.colors.primary,
                  },
                ]}
                onPress={() => onPressNum(num)}
              >
                <AppText size='lll'>{num}</AppText>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotRow: {
    flexDirection: 'row',
    marginBottom: verticalScale(48),
  },
  dot: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(DOT_CIRCLE_WIDTH / 2),
    width: horizontalScale(DOT_CIRCLE_WIDTH),
    height: verticalScale(DOT_CIRCLE_WIDTH),
    marginHorizontal: horizontalScale(DOT_CIRCLE_MARGIN),
  },
  row: {
    flexDirection: 'row',
    marginBottom: verticalScale(16),
  },
  dummyContainer: {
    width: horizontalScale(NUM_CIRCLE_WIDTH),
    marginHorizontal: horizontalScale(NUM_CIRCLE_MARGIN),
    alignItems: 'center',
    justifyContent: 'center',
  },
  numContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(NUM_CIRCLE_WIDTH / 2),
    width: horizontalScale(NUM_CIRCLE_WIDTH),
    height: verticalScale(NUM_CIRCLE_WIDTH),
    marginHorizontal: horizontalScale(NUM_CIRCLE_MARGIN),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PasscodeLock;
