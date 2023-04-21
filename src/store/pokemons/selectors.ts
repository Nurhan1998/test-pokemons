import { RootState } from "../store";

export const selectPokemon = (state: RootState) =>
  state.pokemonSliceReducer.pokemon;
