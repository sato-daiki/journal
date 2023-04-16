import React, { useCallback } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import { DrawerLogo, DrawerPostButton } from '../molecules';

type Props = {
  isMaxLayoutChange: boolean;
} & DrawerContentComponentProps<DrawerContentOptions>;

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

const CustomDrawerContent = ({
  isMaxLayoutChange,
  navigation,
  ...props
}: Props) => {
  const containerStyle = {
    alignItems: isMaxLayoutChange ? 'flex-start' : 'center',
  } as StyleProp<ViewStyle>;

  const itemStyle = {
    width: isMaxLayoutChange ? 218 : 40,
    alignItems: isMaxLayoutChange ? 'flex-start' : 'center',
  } as StyleProp<ViewStyle>;

  const onPressHome = useCallback(() => {
    navigation.navigate('MyDiaryTab');
  }, [navigation]);

  const onPressPost = useCallback(() => {
    navigation.navigate('ModalSelectDiaryType', {
      screen: 'SelectDiaryType',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={containerStyle}>
        <DrawerItem
          label={() => <DrawerLogo isMaxLayoutChange={isMaxLayoutChange} />}
          onPress={onPressHome}
        />

        <DrawerItemList
          itemStyle={itemStyle}
          navigation={navigation}
          {...props}
        />

        <DrawerItem
          label={() => (
            <DrawerPostButton
              isMaxLayoutChange={isMaxLayoutChange}
              onPress={onPressPost}
            />
          )}
          onPress={onPressPost}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawerContent;
