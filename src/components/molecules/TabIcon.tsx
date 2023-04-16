import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector, shallowEqual } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { State } from '../../types/state';

interface Props {
  name: any;
  size: number;
  color: string;
  badgeMode: string;
}

const styles = StyleSheet.create({
  badge: {
    width: 8,
    height: 8,
    top: -4,
    right: -4,
    position: 'absolute',
  },
});

interface LocalStatus {
  unreadCorrectionNum?: number;
}

const getBadgeStatus = (
  badgeMode: string,
  localStatus: LocalStatus,
): number => {
  const { unreadCorrectionNum = 0 } = localStatus;
  if (badgeMode === 'myDiary' && unreadCorrectionNum > 0) {
    return unreadCorrectionNum;
  }
  return 0;
};

const TabIcon = ({ name, size, color, badgeMode }: Props) => {
  const localStatus = useSelector(
    (state: State) => state.rootReducer.localStatus,
    shallowEqual,
  );
  // check badge show or not
  const badgeNum = getBadgeStatus(badgeMode, localStatus);
  return (
    <View>
      <MaterialCommunityIcons name={name} size={size} color={color} />
      {/* {badgeNum > 0 ? (
        <Badge containerStyle={styles.badge} status='error' value={badgeNum} />
      ) : null} */}
    </View>
  );
};

export default TabIcon;
