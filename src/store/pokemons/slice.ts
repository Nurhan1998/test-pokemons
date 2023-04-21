import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TPokemon, TPokemonTypesAPI } from "common/models/IPokemon";

import { fetchPokemon, fetchPokemonTypes } from "./requests";
import { FetchedPages, IPokemonState } from "./types";

const initialState: IPokemonState = {
  pokemon: {
    data: null,
    error: undefined,
    isLoading: false,
  },
  pokemonTypes: {
    data: null,
    error: undefined,
    isLoading: false,
  },
  fetchedPages: [],
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setFetchedPages: (state, action: PayloadAction<FetchedPages>) => {
      state.fetchedPages = [...state.fetchedPages, action.payload];
    },
    clearFetchedPages: (state) => {
      state.fetchedPages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemon.fulfilled,
      (state, action: PayloadAction<TPokemon>) => {
        state.pokemon.data = action.payload;
        state.pokemon.isLoading = false;
      }
    );
    builder.addCase(fetchPokemon.pending, (state) => {
      state.pokemon.isLoading = true;
    });
    builder.addCase(
      fetchPokemon.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.pokemon.isLoading = false;
        state.pokemon.error = action.payload;
      }
    );

    builder.addCase(fetchPokemonTypes.pending, (state) => {
      state.pokemon.isLoading = true;
    });
    builder.addCase(
      fetchPokemonTypes.fulfilled,
      (state, action: PayloadAction<TPokemonTypesAPI>) => {
        state.pokemonTypes.data = action.payload;
        state.pokemonTypes.isLoading = false;
      }
    );
    builder.addCase(
      fetchPokemonTypes.rejected,
      (state, action: PayloadAction<string | undefined>) => {
        state.pokemonTypes.error = action.payload;
        state.pokemonTypes.isLoading = false;
      }
    );
  },
});

export const { setFetchedPages, clearFetchedPages } = pokemonSlice.actions;

export default pokemonSlice.reducer;
