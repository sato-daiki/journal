import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import * as Notifications from 'expo-notifications';
import { Provider } from 'react-redux';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { MenuProvider } from 'react-native-popup-menu';
import { NavigationContainer } from '@react-navigation/native';
import { RootSiblingParent } from 'react-native-root-siblings';
import firestore from '@react-native-firebase/firestore';
import Purchases, { LOG_LEVEL } from 'react-native-purchases';
import { StripeProvider } from '@stripe/stripe-react-native';
import { EventProvider } from 'react-native-outside-press';

import { configureStore } from '@/stores/Store';

import RootNavigatorContainer from '@/containers/RootNavigatorContainer';
import LoadingScreen from '@/screens/LoadingScreen';
import { AppState, AppStateStatus, Platform } from 'react-native';
import MaintenanceScreen from './screens/MaintenanceScreen';

const { store, persistor } = configureStore();

type ConfigMaintenance = {
  status: boolean;
  messageEn: string | null;
  messageJa: string | null;
};

const App = () => {
  const appState = useRef<AppStateStatus>(AppState.currentState);
  const [maintenance, setMaintenance] = useState<ConfigMaintenance>({
    status: false,
    messageEn: null,
    messageJa: null,
  });

  const getMaintenance = useCallback(async () => {
    const doc = await firestore().doc('config/maintenance').get();
    const data = doc.data() as ConfigMaintenance;
    setMaintenance(data);
  }, []);

  const initPurchases = useCallback(() => {
    Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    if (Platform.OS === 'ios') {
      Purchases.configure({ apiKey: process.env.IOS_PURCHASES! });
    } else if (Platform.OS === 'android') {
      Purchases.configure({ apiKey: process.env.ANDROID_PURCHASES! });
    }
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      _handleAppStateChange,
    );
    initPurchases();

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    console.log('[handleAppStateChange]', nextAppState);
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      getMaintenance();
      Notifications.setBadgeCountAsync(0);
    }
    appState.current = nextAppState;
  };

  if (maintenance.status)
    return (
      <MaintenanceScreen
        messageEn={maintenance.messageEn}
        messageJa={maintenance.messageJa}
      />
    );

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
              <EventProvider style={{ flex: 1 }}>
                <MenuProvider>
                  <NavigationContainer>
                    <RootNavigatorContainer />
                  </NavigationContainer>
                </MenuProvider>
              </EventProvider>
            </StripeProvider>
          </RootSiblingParent>
        </ActionSheetProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
