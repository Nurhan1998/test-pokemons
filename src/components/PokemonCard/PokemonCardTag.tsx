import React from "react";
import cn from "common/helpers/classNames";

import { ITag } from "./types";

import styles from "./PokemonCard.module.scss";

export const PokemonCardTag = ({ value, bgColor }: ITag) => {
  return (
    <span className={cn(styles.tag, styles[`color_type__${bgColor}`])}>
      {value}
    </span>
  );
};
