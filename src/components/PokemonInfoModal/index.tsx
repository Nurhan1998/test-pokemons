import React from "react";
import { Modal } from "antd";

import { IPokemonResponse } from "common/models/IPokemon";
import {
  FormatPokemonInfo,
  FormatPokemonRes,
} from "common/helpers/FormatPokemonRes";
import "../PokemonCard/PokemonCardInfo/PokemonCardInfo.scss";

interface IPokemonInfoModalProps {
  selectedPokemon: IPokemonResponse;
  handleModalClose: () => void;
}

function PokemonInfoModal({
  selectedPokemon,
  handleModalClose,
}: IPokemonInfoModalProps) {
  const { avatarUrl, name, stats, abilities, base_experience } =
    FormatPokemonRes(selectedPokemon);

  const additionalInfo = FormatPokemonInfo({
    abilities,
    base_experience,
  });
  return (
    <Modal open={!!selectedPokemon} onCancel={handleModalClose} footer={<></>}>
      <div className="info">
        <img className="info__img" src={avatarUrl} alt={name} />
        <h2 className="info__name">{name}</h2>
        <hr />
        <ul className="info__stats">
          {[...additionalInfo, ...stats].map((stat) => (
            <li key={stat.name}>
              <span className="info__stats_title">{stat.name}</span>:
              <span className="info__stats_value">{stat.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default PokemonInfoModal;
