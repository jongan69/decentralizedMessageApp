import React, { createContext, useState, useReducer, ReactElement } from 'react'
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import * as LocalAuthentication from 'expo-local-authentication';

interface AppContextInterface {
    authenticated: boolean;
    authenticationError: string;
    hasHardware: boolean | undefined;
    dispatch: any,
    walletAddress: string
}

export const AppContext = createContext<AppContextInterface | any>({});

const intiialAuthState = {
    authenticated: false,
    authenticationError: "n/a",
    hasHardware: undefined,
    userName: "John Doe",
    walletAddress: "No Address Found",
    walletBalance: 0,
    profileImageUrl: "No Profile Pic",
    headerBackground: "Default Background",
    favoriteColor: "unknown",
    loginMethod: "null"
}



const authenticate = (state: any) => {
    console.log(`Using ${state.loginMethod} for Auth`)
    switch (state.loginMethod) {
        case "WC":
            break;

        case "GOOG":
            break;

        case "APPL":
            break;

        case "COIN":
            break;

        default:
            console.log(`Error on Auth`)
            break;
    }


    // console.log(`Face ID Doesnt work on Expo Go`)
    // const localAuth = await LocalAuthentication.authenticateAsync({
    //     promptMessage: "Authentication message",
    // });

    // if (localAuth.success) {
    //     return {
    //         authenticated: true,
    //         authenticationError: "None",
    //         hasHardware: await LocalAuthentication.hasHardwareAsync()
    //     }
    // } else {
    //     return {
    //         authenticated: true,
    //         authenticationError: localAuth.error,
    //         hasHardware: await LocalAuthentication.hasHardwareAsync()
    //     }
    // }



    // onSuccess do this
    return {
        authenticated: true,
        authenticationError: "Skipped Any Auth for now...",
        hasHardware: undefined,
        userName: "Fake User",
        walletAddress: "0x814404E8D0e0d64110b8380A296767415F447f60",
        walletBalance: 42069,
        profileImageUrl: "https://avatars.githubusercontent.com/u/29899042?v=4",
        headerBackground: "Default Background",
        favoriteColor: "unknown",
        loginMethod: "null"
    }
}





export const AppProvider = (props: { children: ReactElement }) => {
    const [walletAddress, setWalletAddress] = useState()

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case "LOGIN":
                if (state.authenticated) {
                    console.log(`User is Logged in already`)
                    return;
                } else {
                    console.log(`Logging User In`);
                    return authenticate(state);
                }
    
            case "LOGINWEB3":
                return {
                    authenticated: true,
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
    
            case "LOGOUT": {
                console.log(`Logging User Out`);
                return {
                    authenticated: false,
                    authenticationError: "None",
                    hasHardware: undefined,
                    userName: "John Doe",
                    walletBalance: 0,
                    profileImageUrl: "No Profile Pic",
                    headerBackground: "Default Background",
                    favoriteColor: "unknown",
                    loginMethod: "null"
                }
            }
    
            case "REGISTER":
                console.log('User wants to Sign Up')
                return;
            default:
                console.log(`Current Wallet Address: ${walletAddress}`)
                return state;
        }
    };

    const [auth, dispatch] = useReducer(reducer, intiialAuthState)

    return (
        <AppContext.Provider value={{ auth, dispatch, walletAddress, setWalletAddress }}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppProvider;

