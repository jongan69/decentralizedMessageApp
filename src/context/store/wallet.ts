import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    walletAddress: '',
    loading: false,
    token: null,
    authorized: false,
    isAdmin: false
  },
  reducers: {
    setWallet: (state, action: PayloadAction<string>) => {
      // console.log('Initial',  state)
      state.walletAddress = action.payload;
      state.loading = false
      // console.log('After some work',  state)
    },
    getWallet: state => {
      // console.log('STATE FROM GET WALLET REDUCER',  state)
      state.walletAddress
      state.loading = false
    },
    getToken:  (state, action: PayloadAction<string>) => {
      console.log('STATE FROM GET TOKEN REDUCER',  state)
      console.log('PAYLOAD FROM GET TOKEN REDUCER',  state)
    }
  }
});

export const { setWallet, getWallet, getToken } = walletSlice.actions;
export default walletSlice.reducer;