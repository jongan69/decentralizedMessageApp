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
    authenticated: false
}


const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "LOGIN":
            console.log("authenticated: ", state)
            if(state.authenticated === true){
                console.log(`User is Logged in already`)
                return { authenticated: false}
            } else {
                console.log(`User isn't Logged in, fire face id`)
                return { authenticated: true}
            }
        case "LOGOUT": {
            console.log(`Logging User Out`)
            return { authenticated: false}
        }
        // case "REGISTER":
        //     console.log('User Sign Up')
        //     return { authenticated: true}
        default:
            return state;
    }
};

const authenticate = async () => {
    const authenticated = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authentication message",
    });
  
    if (authenticated.success) {
          //   setState({
          //     authenticationError: "None",
          //   });
          // } else {
          //   setState({
          //     authenticationError: authenticated.error,
          //   });
          }
  }

export const AppProvider = (props: { children: ReactElement }) => {
    const [auth, dispatch] = useReducer(reducer, intiialAuth)
    return (
    <AppContext.Provider value={{ auth, dispatch}}>
        {props.children}
    </AppContext.Provider>
    )
};

export default AppProvider;

