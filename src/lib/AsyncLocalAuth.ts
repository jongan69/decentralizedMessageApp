import * as LocalAuthentication from 'expo-local-authentication';

export const AsyncLocalAuth = async () => {
    try {
        console.log(`Face ID Doesnt work on Expo Go`)
        const localAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: "Authentication message",
        });
    
        if (localAuth.success) {
            return {
                authenticated: true,
                authenticationError: "None",
                hasHardware: await LocalAuthentication.hasHardwareAsync()
            }
        } else {
            return {
                authenticated: true,
                authenticationError: localAuth.error,
                hasHardware: await LocalAuthentication.hasHardwareAsync()
            }
        }
      console.log("locally authenticated");
    } catch (e) {
      console.log(e);
    }
  };