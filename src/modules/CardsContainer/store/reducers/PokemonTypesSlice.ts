import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TPokemonTypesAPI } from "common/models/IPokemon";
import { fetchPokemonTypes } from "../actions/PokemonTypesAC";

interface IPokemonTypesState {
  types: TPokemonTypesAPI | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IPokemonTypesState = {
  types: null,
  isLoading: false,
  error: null,
};

export const pokemonTypesSlice = createSlice({
  name: "types",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPokemonTypes.fulfilled.type]: (
      state,
      action: PayloadAction<TPokemonTypesAPI>
    ) => {
      state.isLoading = false;
      state.error = "";
      state.types = action.payload;
    },
    [fetchPokemonTypes.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPokemonTypes.rejected.type]: (
      state,
      action: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default pokemonTypesSlice.reducer;
