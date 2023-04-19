import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { IDisplayFormat } from "common/helpers/types";
import defaultPokemonImg from "common/img/pokemon-ball.png";
import Card from "UIKit/Card";
import "./PokemonCard.scss";
import PokemonCardInfo from "./PokemonCardInfo";

interface IPokemonCard {
  avatarUrl: string;
  name: string;
  tags: string[];
  stats: IDisplayFormat[];
  handleCardClick(): void;
}

const PokemonCard = ({
  avatarUrl,
  handleCardClick,
  ...props
}: IPokemonCard) => {
  return (
    <div className="pokemon-card" onClick={handleCardClick}>
      <Card
        avatar={
          <LazyLoadImage
            className="pokemon-card__img"
            src={avatarUrl || defaultPokemonImg}
            placeholderSrc={defaultPokemonImg}
            alt={props.name}
          />
        }
        info={<PokemonCardInfo {...props} />}
      />
    </div>
  );
};

export default PokemonCard;
