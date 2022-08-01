import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

import walletReducer from './wallet';
import messageReducer from './message';
import usersReducer from './users';

// Other reducers
// import authReducer from './auth'
// import cartReducer from './cart'
// import ignoreReducer from './ignore'
// import todoReducer from './todo'
// import watchlistReducer from './watchlist'

const persistConfig = {
  key: 'wallet',
  storage: AsyncStorage,
  whitelist: ['walletAddress']
};

const persistedWallet = persistReducer(persistConfig, walletReducer);


const reducers = combineReducers({
  wallet: persistedWallet,
  message: messageReducer,
  users: usersReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: [thunk]
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;