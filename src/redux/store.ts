import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderSlice from './slices/order-slice';
import auth from './slices/auth-slice';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  orderSlice,
  auth,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['orderSlice'],
};

const reducers = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
