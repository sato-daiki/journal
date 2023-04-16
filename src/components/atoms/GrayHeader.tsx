import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { fontSizeM, primaryColor, offWhite } from '../../styles/Common';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
  title: string;
}

const styles = StyleSheet.create({
  row: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: offWhite,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    color: primaryColor,
    fontSize: fontSizeM,
    fontWeight: 'bold',
  },
});

const GrayHeader: React.FC<Props> = ({ title, icon, containerStyle, titleStyle }: Props) => {
  return (
    <View style={[styles.row, containerStyle]}>
      {<View style={styles.icon}>{icon}</View> || undefined}
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

export default React.memo(GrayHeader);
