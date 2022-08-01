import { createSlice } from "@reduxjs/toolkit";

const watchListSlice = createSlice({
  name: "watchList",
  initialState: [],
  reducers: {
    addToWatchList: (state, { payload }) => {
      const newItemWatched = {
        payload,
      };
      state.push(newItemWatched);
    },
    deleteFromWatchList: (state, { payload }) => {
      return state.filter(({ id }) => id !== payload);
    },
    emptyWatchList: () => initialState,
  },
});

export const { addToWatchList, deleteFromWatchList, emptyWatchList } = watchListSlice.actions;

export default watchListSlice.reducer;
