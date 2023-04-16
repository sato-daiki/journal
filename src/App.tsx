import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
// import * as Linking from 'expo-linking';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';

import { configureStore } from '@/stores/Store';
// import * as Sentry from 'sentry-expo';

import RootNavigatorContainer from '@/containers/RootNavigatorContainer';
import LoadingScreen from '@/screens/LoadingScreen';

const { store, persistor } = configureStore();

// エラー監視
// Sentry.init({
//   dsn: 'https://95ddcc469fab4a40be49d130bc3e71ed@o380775.ingest.sentry.io/5207104',
//   enableInExpoDevelopment: true,
//   debug: false,
// });

// const prefix = Linking.makeUrl('/');

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ActionSheetProvider>
          <MenuProvider>
            <NavigationContainer>
              <RootNavigatorContainer />
            </NavigationContainer>
          </MenuProvider>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
