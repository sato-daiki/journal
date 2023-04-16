import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal } from '../../template';
import AfterPublished from './AfterPublished';
import BeforePublished from './BeforePublished';

interface Props {
  visible: boolean;
  isPublish: boolean;
  isLoading: boolean;
  usePoints: number;
  points: number;
  publishMessage: string | null;
  onPressSubmit: () => void;
  onPressCloseCancel: () => void;
  onClosePostDiary: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export const ModalPublish: React.FC<Props> = ({
  visible,
  isPublish,
  isLoading,
  usePoints,
  points,
  publishMessage,
  onPressSubmit,
  onPressCloseCancel,
  onClosePostDiary,
}: Props) => {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        {!isPublish ? (
          <BeforePublished
            isLoading={isLoading}
            usePoints={usePoints}
            points={points}
            onPressSubmit={onPressSubmit}
            onPressCloseCancel={onPressCloseCancel}
          />
        ) : (
          <AfterPublished publishMessage={publishMessage} onPressClose={onClosePostDiary} />
        )}
      </View>
    </Modal>
  );
};
