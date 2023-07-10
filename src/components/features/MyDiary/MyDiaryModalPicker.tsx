import React, { useCallback, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AppText } from '@/components/atoms';
import ModalPicker, { PickerItem } from '../../molecules/ModalPicker';
import { useAppTheme } from '@/styles/colors';
import { fontSizeL } from '@/styles/fonts';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  hasRevised: boolean;
  selectedItem: PickerItem;
  items: PickerItem[];
  onPressItem: (item: PickerItem) => void;
};

const MyDiaryModalPicker: React.FC<Props> = ({
  containerStyle,
  hasRevised,
  selectedItem,
  items,
  onPressItem,
}) => {
  const theme = useAppTheme();
  const [isVisible, setIsVisible] = useState(false);

  const onPress = useCallback(() => {
    setIsVisible(true);
  }, []);

  const handlePressItem = useCallback(
    (item: PickerItem) => {
      setIsVisible(false);
      onPressItem(item);
    },
    [onPressItem],
  );

  return (
    <>
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={() => hasRevised && onPress()}
      >
        {/* ヘッダーの文字サイズは固定 */}
        <AppText style={styles.text} size='l' bold={hasRevised}>
          {selectedItem.label}
        </AppText>
        {hasRevised && (
          <MaterialCommunityIcons
            size={32}
            color={theme.colors.primary}
            name={'chevron-down'}
          />
        )}
      </TouchableOpacity>
      <ModalPicker
        isVisible={isVisible}
        items={items}
        onPressItem={handlePressItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: fontSizeL,
    lineHeight: fontSizeL * 1.3,
  },
});

export default React.memo(MyDiaryModalPicker);
