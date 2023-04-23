// global __DEV__
import {
  legacy_createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import rootReducer from './reducers';

const reducer = combineReducers({ rootReducer });
const logger = __DEV__ ? [reduxLogger] : [];

const middlewares = applyMiddleware(...logger, thunk);
//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const initialState = {};

export const store = legacy_createStore(
  reducer,
  initialState,
  composeEnhancers(middlewares),
);

export const configureStore = () => {
  const persistor = persistStore(store);
  return { persistor, store };
};
