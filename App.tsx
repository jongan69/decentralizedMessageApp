import './src/constants/global'
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { LogBox, Platform } from "react-native";
import { AppProvider } from './src/context/AppProvider';
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import { Provider } from 'react-redux';
import { store } from './src/context/store';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
LogBox.ignoreAllLogs();
const SCHEME_FROM_APP_JSON = 'demo'

// AppProvider: Provides a Global Wallet Address
// Provider: Uses redux-toolkit with redux-persist for data that should be persisted from local async storage
// WalletConnect Provider: If the users uses walletconnect we can access their wallet from a slightly lower level

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  let persistor = persistStore(store);

  return (
    <AppProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {isLoadingComplete
            &&
            <SafeAreaProvider>
              <WalletConnectProvider
                redirectUrl={
                  Platform.OS === "web"
                    ? window.location.origin
                    : `${SCHEME_FROM_APP_JSON}://`
                }
                storageOptions={{
                  asyncStorage: AsyncStorage,
                }}>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </WalletConnectProvider>
            </SafeAreaProvider>
          }
        </PersistGate>
      </Provider>
    </AppProvider>
  );
}