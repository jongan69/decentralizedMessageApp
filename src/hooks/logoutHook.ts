import { useEffect, useState, useCallback } from 'react';
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { SaveItem } from '../lib/AsyncStorageFunctions'

  // This takes care of WC and Async Storage Auth
export default function isLoggedOut() {
    const [isLoggedOut, setIsLoggedOut] = useState(false);
    const connector = useWalletConnect();

    const killSession = useCallback(() => {
        return connector.killSession();
    }, []);


    // Logout User in Async
    useEffect(() => {
        function logoutHook() {
            try {
                SaveItem("walletAddress", "")
                    .then((res) => {
                        if (connector.connected) {
                            killSession();
                        }
                        console.warn("Logged out Successfully");
                    })
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setIsLoggedOut(true);
            }
        }

        logoutHook();
    }, []);

    return isLoggedOut;
}