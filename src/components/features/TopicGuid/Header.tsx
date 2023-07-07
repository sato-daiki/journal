import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading, Icon, Space } from '@/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '@/styles/colors';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View>
      <Icon onPress={onPressClose}>
        <MaterialCommunityIcons
          name='close'
          size={24}
          color={theme.colors.primary}
          style={styles.close}
        />
      </Icon>
      <Space size={24} />
      <Heading title={title} titleStyle={styles.heading} />
      <Space size={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 20,
    zIndex: 100,
  },
  heading: {
    marginVertical: 0,
    paddingBottom: 12,
  },
});

export default React.memo(Header);
