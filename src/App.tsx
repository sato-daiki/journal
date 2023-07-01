import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { StripeProvider } from '@stripe/stripe-react-native';

import { configureStore } from '@/stores/Store';
import RootNavigatorContainer from '@/containers/RootNavigatorContainer';
import LoadingScreen from '@/screens/LoadingScreen';
import { Platform } from 'react-native';

const { store, persistor } = configureStore();

const App = () => {
  const initPurchases = useCallback(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: process.env.IOS_PURCHASES! });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: process.env.ANDROID_PURCHASES! });
    }
  }, []);

  useEffect(() => {
    initPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <ActionSheetProvider>
          <RootSiblingParent>
            <StripeProvider
              publishableKey={
                __DEV__
                  ? process.env.TEST_STRIPE_PUBLBISHABLE_KEY!
                  : process.env.ADMIN_STRIPE_PUBLBISHABLE_KEY!
              }
            >
              <MenuProvider>
                <NavigationContainer>
                  <RootNavigatorContainer />
                </NavigationContainer>
              </MenuProvider>
            </StripeProvider>
          </RootSiblingParent>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
