import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TimeBox } from '../atoms';
// import { DateTimePickerModal, TimeBox } from '../atoms';

type Props = {
  date: Date;
  onChange: (date: Date) => void;
};

const TimePicker: React.FC<Props> = ({ date, onChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const onPress = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleConfirm = (date: Date) => {
    // ※Android2回表示バグ対策： https://github.com/react-native-community/datetimepicker/issues/54#issuecomment-552951685
    setIsVisible(false);
    onChange(date);
  };

  return (
    <View>
      <TimeBox onPress={onPress} date={date} />
      <DateTimePickerModal
        isVisible={isVisible}
        date={date ?? undefined}
        mode='time'
        onConfirm={handleConfirm}
        onCancel={onCancel}
      />
    </View>
  );
};

export default React.memo(TimePicker);
