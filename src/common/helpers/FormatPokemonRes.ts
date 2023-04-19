import { FormatedResult, IDisplayFormat, TPokemonDisplayInfo } from "./types";
import { IPokemonResponse } from "./../models/IPokemon";

export const FormatPokemonRes = (
  pokemonData: IPokemonResponse
): FormatedResult => {
  const avatarUrl = pokemonData.sprites.other
    ? pokemonData.sprites.other["official-artwork"].front_default
    : "";
  const stats = pokemonData.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));
  const types = pokemonData.types.map((type) => type.type.name);

  return {
    ...pokemonData,
    avatarUrl,
    stats,
    types,
  };
};

export const FormatPokemonInfo = (
  pokemonData: TPokemonDisplayInfo
): IDisplayFormat[] => {
  const formatedAbilities = pokemonData.abilities
    .map((ab) => ab.ability.name)
    .join(", ");

  const abilities = {
    name: "abilities",
    value: formatedAbilities,
  };
  const baseExperience = {
    name: "base experience",
    value: pokemonData.base_experience,
  };

  return [abilities, baseExperience];
};
