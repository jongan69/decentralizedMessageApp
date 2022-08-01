import React, { createContext, useState } from 'react'
interface AppContextInterface {
    sleeping: false,
    loading: false,
    loggedin: false
}

export const AppContext = createContext<AppContextInterface | any>({});

export const AppProvider = (props: { children: any }) => {
    const [currentWalletAddress, setCurrentWalletAddress] = useState<string>("")
    return (
        <AppContext.Provider value={{ currentWalletAddress, setCurrentWalletAddress }}>
            {props.children}
        </AppContext.Provider >
    )
};

export default AppProvider;

