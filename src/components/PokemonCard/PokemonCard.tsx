import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import defaultPokemonImg from "common/img/pokemon-ball.png";

import PokemonCardInfo from "./PokemonCardInfo";
import styles from "./PokemonCard.module.scss";
import { IPokemonCardProps } from "./types";

const PokemonCard = ({
  avatarUrl,
  handleCardClick,
  ...props
}: IPokemonCardProps) => {
  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.card_avatar__wrapper}>
        <LazyLoadImage
          className={styles.card_img}
          src={avatarUrl || defaultPokemonImg}
          placeholderSrc={defaultPokemonImg}
          alt={props.name}
        />
      </div>
      <div className={styles.card_info__wrapper}>
        <PokemonCardInfo {...props} />
      </div>
    </div>
  );
};

export default PokemonCard;
