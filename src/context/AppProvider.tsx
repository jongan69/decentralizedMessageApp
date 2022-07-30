import React, { createContext, useReducer, ReactElement } from 'react'
import * as LocalAuthentication from 'expo-local-authentication';

interface AppContextInterface {
    authenticated: boolean;
    authenticationError: string;
    hasHardware: boolean | undefined;
    dispatch: any
}

export const AppContext = createContext<AppContextInterface | any>({});

const intiialAuth = {
    authenticated: false,
    authenticationError: "n/a",
    hasHardware: undefined,
}

const authenticate = (state: any) => {
    console.log(`Face ID Doesnt work on Expo Go`)
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

    console.log(`Authenticating: ${JSON.stringify(state)}`)            
    return {
        authenticated: true,
        authenticationError: "Face ID Doesnt work on Expo Go",
        hasHardware: undefined
    }
}

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            console.log("authenticate object state: ", state)
            if (state.authenticated) {
                console.log(`User is Logged in already`)
                return {
                    authenticated: true,
                    authenticationError: "None",
                    hasHardware: undefined
                }
            } else {
                return authenticate(state);
            }

        case "LOGOUT": {
            console.log(`Logging User Out`)
            return {
                authenticated: false,
                authenticationError: "None",
                hasHardware: undefined
            }
        }
        // case "REGISTER":
        //     console.log('User Sign Up')
        //     return { authenticated: true}
        default:
            return state;
    }
};



export const AppProvider = (props: { children: ReactElement }) => {
    const [auth, dispatch] = useReducer(reducer, intiialAuth)
    return (
        <AppContext.Provider value={{ auth, dispatch }}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppProvider;

