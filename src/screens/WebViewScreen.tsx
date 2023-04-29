import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { LoadingModal } from '../components/atoms';
import { MyDiaryTabStackParamList } from '../navigations/MyDiaryTabNavigator';

type WebViewRouteProp = RouteProp<
  MyDiaryTabStackParamList,
  'RecommendedMethod'
>;

type ScreenType = {
  route: WebViewRouteProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const WebViewScreen: React.FC<ScreenType> = ({ route }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  return (
    <>
      <LoadingModal visible={initialLoading} />
      <WebView
        source={{ uri: route.params.url }}
        style={styles.container}
        onLoadEnd={(): void => setInitialLoading(false)}
      />
    </>
  );
};

export default WebViewScreen;
