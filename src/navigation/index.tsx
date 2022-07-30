
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import React, { useEffect, useContext, useCallback } from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import AuthStack from './AuthStack';
import AppStack from './AppStack'

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import LinkingConfiguration from './LinkingConfiguration';
import loginHook from '../hooks/loginHook';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { AppContext } from '../context/AppProvider';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { auth, dispatch, currentWalletAddress, setCurrentWalletAddress } = useContext(AppContext);
  const connector = useWalletConnect();

  const syncAuths = async () => {
    if(connector.connected && connector.accounts[0] !== currentWalletAddress){
      setCurrentWalletAddress(connector.accounts[0])
    } 
    
    if(!auth.authenticated && currentWalletAddress.length > 40){
      dispatch({ type: "LOGIN" })
    }
  }

  useEffect(() => {
    syncAuths();
  },[currentWalletAddress, connector])
  

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {auth.authenticated
      ?
        <AppStack />
        :
        <AuthStack />
      }
    </NavigationContainer>
  );
}
