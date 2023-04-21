import React from "react";

import { PokemonCardTag } from "./PokemonCardTag";
import { IPokemonCardInfoProps } from "./types";
import styles from "./PokemonCard.module.scss";

const PokemonCardInfo = ({
  additionalInfo,
  stats,
  name,
  tags,
}: IPokemonCardInfoProps) => {
  return (
    <div className={styles.info}>
      <h5 className={styles.info_name}>{name}</h5>
      <div className={styles.info_tags}>
        {tags.map((tag) => (
          <PokemonCardTag bgColor={tag} key={tag} value={tag} />
        ))}
      </div>
      <ul className={styles.info_stats}>
        {additionalInfo.map((stat) => (
          <li key={stat.name}>
            <span className={styles.info_stats__title}>{stat.name}</span>:
            <span className={styles.info_stats__value}>{stat.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonCardInfo;
