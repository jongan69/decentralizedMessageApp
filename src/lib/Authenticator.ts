export const authenticate = (state: any, walletAddress: string) => {
    if (walletAddress.length > 40) {
        console.log(`Use loginHook for Local Auth`)
    } else {
        console.log(`Using ${state.loginMethod} for Auth`)
        switch (state.loginMethod) {
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
    }
}