import React, { ReactElement } from "react";

import "./Card.scss";

interface ICardProps {
  avatar: ReactElement;
  info: ReactElement;
}

const Card = ({ avatar, info }: ICardProps) => {
  return (
    <div className="card">
      <div className="card__avatar">{avatar}</div>
      <div className="card__info">{info}</div>
    </div>
  );
};

export default Card;
