import { TPokemon } from "common/models/IPokemon";

export interface IFilterPokemonParams {
  pokemon: TPokemon | null;
  name?: string;
  types?: string[];
}
