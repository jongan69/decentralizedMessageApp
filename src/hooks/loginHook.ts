import { useEffect, useState, useContext } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { SaveItem } from '../lib/AsyncStorageFunctions'
import { AppContext } from '../context/AppProvider';

export default function isLoggedIn() {
    const { currentWalletAddress } = useContext(AppContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const connector = useWalletConnect();

    // Login User
    useEffect(() => {
        async function loginHook() {
            try {
                // If wallet connect save wc address
                if (connector.connected) {
                    // on Wallect Connect
                    await SaveItem("walletAddress", connector.accounts[0])
                        .then((res) => {
                            console.log(`Saved Wallet Connect Address to Async Storage`)
                        })
                } 
                
                // if manual entry save manual address
                if (currentWalletAddress.length > 40) {
                    // on manual wallet
                    await SaveItem("walletAddress", currentWalletAddress)
                        .then((res) => {
                            console.log(`Saved Manual Wallet Address to Async Storage`)
                        })
                }
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setIsLoggedIn(true);
            }
        }

        loginHook();
    }, [currentWalletAddress]);

    return {
        authenticated: isLoggedIn,
        authenticationError: "None",
        hasHardware: undefined,
        userName: "John Doe",
        walletBalance: 0,
        walletAddress,
        profileImageUrl: "No Profile Pic",
        headerBackground: "Default Background",
        favoriteColor: "unknown",
        loginMethod: "WC"
    }
}