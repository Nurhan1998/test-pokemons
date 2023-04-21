import {
  FormatPokemonInfo,
  FormatPokemonRes,
} from "common/helpers/FormatPokemonRes";
import { IPokemonResponse } from "common/models/IPokemon";
import { IPokemonCardView } from "components/PokemonCard/types";
import { IFilterPokemonParams } from "./types";

export function getPokemonViewData(
  pokemonsListResponse: IPokemonResponse[]
): IPokemonCardView[] {
  return pokemonsListResponse.map((pokemonData) => {
    const { abilities, base_experience, types, ...rest } =
      FormatPokemonRes(pokemonData);

    const additionalInfo = FormatPokemonInfo({
      abilities,
      base_experience,
    });

    return {
      ...rest,
      tags: types,
      additionalInfo,
    };
  });
}

export const filterPokemon = ({
  pokemon,
  name = "",
  types = [],
}: IFilterPokemonParams): IPokemonResponse[] => {
  const formatedName = name.trim().toLowerCase();
  const filteredList =
    pokemon?.results.filter((pokemon) => {
      const { types: formatedTypes } = FormatPokemonRes(pokemon);
      const isIncludesName = pokemon.name.includes(formatedName);
      const isTypesEmpty = !types.length;
      const isSameType = types.find((type) =>
        formatedTypes.find((FTypes) => FTypes === type)
      );

      return isIncludesName && (isTypesEmpty || isSameType);
    }) || [];

  return filteredList;
};
