import { FormatPokemonRes } from "common/helpers/FormatPokemonRes";
import { IPokemonResponse } from "common/models/IPokemon";
import { IFilterPokemonParams } from "./types";

export const filterPokemon = ({
  pokemon,
  name = "",
  types = [],
}: IFilterPokemonParams): IPokemonResponse[] => {
  const formatedName = name.toLowerCase();
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
