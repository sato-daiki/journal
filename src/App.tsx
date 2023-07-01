import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { configureStore } from '@/stores/Store';

import LoadingScreen from '@/screens/LoadingScreen';
import AppProviderContainer from './containers/AppProviderContainer';

const { store, persistor } = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <AppProviderContainer />
      </PersistGate>
    </Provider>
  );
};

export default App;
