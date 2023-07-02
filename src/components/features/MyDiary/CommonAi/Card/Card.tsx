import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAppTheme } from '@/styles/colors';

interface Props {
  header: ReactNode;
  main: ReactNode;
}

const Card: React.FC<Props> = ({ header, main }) => {
  const theme = useAppTheme();
  return (
    <View
      style={[
        styles.container,
        {
          borderTopColor: theme.colors.borderLight,
          backgroundColor: theme.colors.backgroundOff,
        },
      ]}
    >
      {header}
      {main}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    height: 240,
  },
});

export default Card;
