import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TPokemon } from "common/models/IPokemon";
import { fetchPokemon } from "../actions/PokemonAC";

interface IPokemonState {
  pokemon: TPokemon | null;
  isLoading: boolean;
  error: string;
}

const initialState: IPokemonState = {
  pokemon: null,
  isLoading: false,
  error: "",
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPokemon.fulfilled.type]: (state, action: PayloadAction<TPokemon>) => {
      state.isLoading = false;
      state.error = "";
      state.pokemon = action.payload;
    },
    [fetchPokemon.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchPokemon.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default pokemonSlice.reducer;
