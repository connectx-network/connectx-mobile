import {setAutoFreeze} from 'immer';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';

import appSettingSlice, {IAppSettingState} from '@redux/slices/appSettingSlice';
import userSlice, {UserState} from '@redux/slices/userSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSagas';

setAutoFreeze(false);

export interface IRootState {
  appSetting: IAppSettingState;
  user: UserState;
}

const reducers = combineReducers({
  appSetting: appSettingSlice,
  user: userSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 10000,
  whitelist: ['appSetting', 'user'],
  blacklist: [],
};

const sagaMiddleware = createSagaMiddleware();
let middleware = [sagaMiddleware];
// if (__DEV__) {
//   false && middleware.push(logger);
// }
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleware),
});
const persistor = persistStore(store);
sagaMiddleware.run(rootSaga);

export {persistor, store};
