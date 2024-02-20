import {setAutoFreeze} from 'immer';
import {combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';

import typeVehicleSlice, {
  ITypeVehicleState,
} from '@redux/slices/typeVehicleSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSagas';

setAutoFreeze(false);

export interface IRootState {
  typeVehicle: ITypeVehicleState;
}

const reducers = combineReducers({
  typeVehicle: typeVehicleSlice,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 10000,
  whitelist: ['typeVehicle'],
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
