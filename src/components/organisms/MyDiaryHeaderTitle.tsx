import React, { useMemo } from 'react';
import { PickerItem } from '../molecules/ModalPicker';
import I18n from '@/utils/I18n';
import MyDiaryModalPicker from '../molecules/MyDiaryModalPicker';

export type WhichDiaryKey = 'revised' | 'original';

export type MyDiaryPickerItem = {
  value: WhichDiaryKey;
  label: string;
};

interface Props {
  hasRevised: boolean;
  selectedItem: PickerItem;
  onPressItem: (item: PickerItem) => void;
}

export const myDiaryItems: MyDiaryPickerItem[] = [
  { value: 'original', label: I18n.t('myDiary.original') },
  { value: 'revised', label: I18n.t('myDiary.revised') },
];

const MyDiaryHeaderTitle: React.FC<Props> = ({
  hasRevised,
  selectedItem,
  onPressItem,
}) => {
  const options: PickerItem[] = useMemo(() => {
    if (hasRevised) {
      return myDiaryItems;
    } else {
      return [myDiaryItems[0]];
    }
  }, [hasRevised]);

  return (
    <MyDiaryModalPicker
      hasRevised={hasRevised}
      items={options}
      selectedItem={selectedItem}
      onPressItem={onPressItem}
    />
  );
};

export default MyDiaryHeaderTitle;
