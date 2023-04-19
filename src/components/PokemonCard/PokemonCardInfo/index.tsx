import React from "react";

import { IDisplayFormat } from "common/helpers/types";
import Tag from "UIKit/Tag";
import "./PokemonCardInfo.scss";

interface IPokemonCardInfoProps {
  name: string;
  tags: string[];
  stats: IDisplayFormat[];
}

const PokemonCardInfo = ({ stats, name, tags }: IPokemonCardInfoProps) => {
  return (
    <div className="info">
      <h5 className="info__name">{name}</h5>
      <div className="info__tags">
        {tags.map((tag) => (
          <Tag bgColor={tag} key={tag}>
            <>{tag}</>
          </Tag>
        ))}
      </div>
      <ul className="info__stats">
        {stats?.map((stat) => (
          <li key={stat.name}>
            <span className="info__stats_title">{stat.name}</span>:
            <span className="info__stats_value">{stat.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonCardInfo;
