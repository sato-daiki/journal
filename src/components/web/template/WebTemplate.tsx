import React, { ReactNode } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { maxLayoutChange, offWhite } from '../../../styles/Common';

interface Props {
  isMaxLayoutChange: boolean;
  leftTop: boolean;
  warapper?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
  leftContainer?: StyleProp<ViewStyle>;
  centerContainer?: StyleProp<ViewStyle>;
  rightContainer?: StyleProp<ViewStyle>;
  renderLeft?: ReactNode;
  renderCenter?: ReactNode;
  renderRight?: ReactNode;
}

const styles = StyleSheet.create({
  warapper: {
    width: '100%',
    backgroundColor: offWhite,
    paddingBottom: 64,
  },
  container: {
    width: '100%',
    maxWidth: maxLayoutChange,
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  containerPc: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerSp: {
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  partContainerPc: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16,
  },
  partContainerSp: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

const WebTemplate = ({
  isMaxLayoutChange,
  leftTop,
  warapper,
  container,
  leftContainer,
  centerContainer,
  rightContainer,
  renderLeft,
  renderCenter,
  renderRight,
}: Props) => {
  return (
    <View style={[styles.warapper, warapper]}>
      <View
        style={[
          styles.container,
          isMaxLayoutChange
            ? styles.containerPc
            : {
                ...styles.containerSp,
                flexDirection: leftTop ? 'column' : 'column-reverse',
              },
          container,
        ]}
      >
        {renderLeft ? (
          <View
            style={[
              isMaxLayoutChange
                ? styles.partContainerPc
                : styles.partContainerSp,
              { paddingBottom: !isMaxLayoutChange && leftTop ? 32 : 0 },
              leftContainer,
            ]}
          >
            {renderLeft}
          </View>
        ) : null}
        {renderCenter ? (
          <View
            style={[
              isMaxLayoutChange
                ? styles.partContainerPc
                : styles.partContainerSp,
              { paddingBottom: !isMaxLayoutChange ? 32 : 0 },
              centerContainer,
            ]}
          >
            {renderCenter}
          </View>
        ) : null}
        {renderRight ? (
          <View
            style={[
              isMaxLayoutChange
                ? styles.partContainerPc
                : styles.partContainerSp,
              { paddingBottom: !isMaxLayoutChange && !leftTop ? 32 : 0 },
              rightContainer,
            ]}
          >
            {renderRight}
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default WebTemplate;
