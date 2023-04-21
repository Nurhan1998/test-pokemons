import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface QueryStore {
  query: URLSearchParams | null;
}

const initialState: QueryStore = {
  query: null,
};

const queryStore = createSlice({
  name: "queryStore",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<URLSearchParams>) => {
      console.log(action.payload, "action.payload");
      state.query = action.payload;
    },
  },
});

export const selectQuery = (state: RootState): URLSearchParams | null =>
  state.queryStoreReducer.query;
export const { setQuery } = queryStore.actions;
export default queryStore.reducer;
