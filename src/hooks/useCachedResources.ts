import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { ReadItem } from '../lib/AsyncStorageFunctions'
import loginHook from '../hooks/loginHook';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [storedWalletAddress, setStoredWalletAddress] = useState<string>("")

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Check for Wallet Address
        await ReadItem("walletAddress")
          .then((res) => {
            if (res !== null && res.length > 40) {
              // Restore session if found wallet in async
              setStoredWalletAddress(res)
            } else {
              console.warn("no wallet address found");
            }
          })
          .catch((e) => console.warn(e));

          if(storedWalletAddress){
            console.log("trying to restore session", storedWalletAddress);
            // loginHook(storedWalletAddress)
          }
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'Roboto-MediumItalic': require('../assets/fonts/Roboto-MediumItalic.ttf'),
          'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
          'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
          'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
        });

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
