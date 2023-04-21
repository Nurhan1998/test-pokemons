import { AxiosError } from "axios";
import { TPokemon, TPokemonTypesAPI } from "common/models/IPokemon";

export type DefaultState<T> = {
  data: T;
  error: string | undefined;
  isLoading: boolean;
};

export interface IPokemonState {
  pokemon: DefaultState<TPokemon | null>;
  pokemonTypes: DefaultState<TPokemonTypesAPI | null>;
  fetchedPages: FetchedPages[];
}

export type FetchedPages = {
  page: string;
  rangeStart: string;
  rangeEnd: string;
};
