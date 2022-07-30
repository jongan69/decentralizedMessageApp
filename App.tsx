import './src/constants/global'
import React, { useContext } from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

import useCachedResources from './src/hooks/useCachedResources';
import useColorScheme from './src/hooks/useColorScheme';
import Navigation from './src/navigation';
import { LogBox, Platform, ActivityIndicator } from "react-native";
import { AppProvider } from './src/context/AppProvider';
import WalletConnectProvider from "@walletconnect/react-native-dapp";

LogBox.ignoreAllLogs();
const SCHEME_FROM_APP_JSON = 'demo'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  return (
    <AppProvider>
      {!isLoadingComplete
        ? <ActivityIndicator />
        :
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
    </AppProvider>
  );
}
