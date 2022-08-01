
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View } from '../components/Themed';
import LinkingConfiguration from './LinkingConfiguration';

import { ColorSchemeName, StyleSheet, ActivityIndicator } from 'react-native';
import { AppContext } from '../context/AppProvider';
import AuthStack from './AuthStack';
import AppStack from './AppStack'
import { RootState } from '../context/store';
import { useSelector } from 'react-redux';


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { currentWalletAddress, setCurrentWalletAddress } = useContext(AppContext);
  const loading = useSelector((state: RootState) => state.wallet.loading);
  const wallet = useSelector((state: RootState) => state.wallet.walletAddress);

  useEffect(() => {
    if(wallet){
      console.log('Wallet found in store, update user data from DB')
      setCurrentWalletAddress(wallet)
      console.log('Updated global wallet state from store to', currentWalletAddress)
    } else {
      console.log('No wallet to restore: ', currentWalletAddress)
    }
  }, [wallet, currentWalletAddress]);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {loading
        ?
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator />
        </View>
        :
        <>
          {wallet
            ?
            <AppStack />
            :
            <AuthStack />
          }
        </>
      }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
