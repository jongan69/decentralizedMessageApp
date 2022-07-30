import React, { createContext, useState, useReducer, ReactElement, useEffect } from 'react'

interface AppContextInterface {
    authenticated: boolean;
    authenticationError: string;
    hasHardware: boolean | undefined;
    dispatch: any,
    currentWalletAddress: string,
    storedWalletAddress: string,
    loading: false
}

export const AppContext = createContext<AppContextInterface | any>({});

const intiialAuthState = {
    authenticated: false,
    authenticationError: "n/a",
    hasHardware: undefined,
    userName: "John Doe",
    walletAddress: "",
    walletBalance: 0,
    profileImageUrl: "No Profile Pic",
    headerBackground: "Default Background",
    favoriteColor: "unknown",
    loginMethod: ""
}


export const AppProvider = (props: { children: ReactElement }) => {
    const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("")

    const reducer = (state: any, action: any) => {
        switch (action.type) {
            case "LOGIN":
                if (currentWalletAddress.length > 40) {
                    console.log(`Login Reducer`);
                    return {
                        authenticated: true,
                        authenticationError: "None",
                        hasHardware: undefined,
                        userName: currentWalletAddress,
                        walletBalance: 0,
                        walletAddress: currentWalletAddress,
                        profileImageUrl: "No Profile Pic",
                        headerBackground: "Default Background",
                        favoriteColor: "unknown",
                        loginMethod: "null"
                    }
                }

            case "LOGOUT": {
                console.log(`Logout Reducer`);
                return {
                    authenticated: false,
                    authenticationError: "None",
                    hasHardware: undefined,
                    userName: "John Doe",
                    walletBalance: 0,
                    walletAddress: "",
                    profileImageUrl: "No Profile Pic",
                    headerBackground: "Default Background",
                    favoriteColor: "unknown",
                    loginMethod: "null"
                }
            }

            default:
                console.log(`default auth reducer: ${state}`)
                return state;
        }
    };

    const [auth, dispatch] = useReducer(reducer, intiialAuthState)


    return (
        <AppContext.Provider
            value={{
                auth,
                dispatch,
                currentWalletAddress,
                setCurrentWalletAddress,
            }}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppProvider;

