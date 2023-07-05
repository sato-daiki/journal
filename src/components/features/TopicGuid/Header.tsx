import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { Heading, Space } from '@/components';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const navigation = useNavigation();
  const onPressClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View>
      <MaterialCommunityIcons
        name='close'
        size={24}
        style={styles.close}
        onPress={onPressClose}
      />
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
