import React from "react";

import {
  FormatPokemonInfo,
  FormatPokemonRes,
} from "common/helpers/FormatPokemonRes";
import { IPokemonResponse } from "common/models/IPokemon";
import PokemonCard from "components/PokemonCard";

interface ICardContainer {
  handleCardClick(pokemon: IPokemonResponse): void;
  pokemon: IPokemonResponse;
}

const CardContainer = ({ handleCardClick, pokemon }: ICardContainer) => {
  const { avatarUrl, name, types, abilities, base_experience } =
    FormatPokemonRes(pokemon);

  const additionalInfo = FormatPokemonInfo({
    abilities,
    base_experience,
  });

  const onCardClick = () => handleCardClick(pokemon);

  return (
    <PokemonCard
      avatarUrl={avatarUrl}
      name={name}
      tags={types}
      stats={additionalInfo}
      handleCardClick={onCardClick}
    />
  );
};

export default CardContainer;
