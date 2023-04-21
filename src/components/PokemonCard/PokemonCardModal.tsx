import React from "react";
import { Modal } from "antd";

import styles from "./PokemonCard.module.scss";
import { IPokemonInfoModalProps } from "./types";

function PokemonInfoModal({
  handleModalClose,
  name,
  avatarUrl,
  stats,
  additionalInfo,
}: IPokemonInfoModalProps) {
  return (
    <Modal open={!!name} onCancel={handleModalClose} footer={<></>}>
      <div className={styles.card_info}>
        <img src={avatarUrl} alt={name} />
        <h2 className={styles.info_name}>{name}</h2>
        <hr />
        <ul className={styles.info_stats}>
          {[...additionalInfo, ...stats].map(({ name: statName, value }) => (
            <li key={statName}>
              <span className={styles.info_stats__title}>{statName}</span>:
              <span className={styles.info_stats__value}>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

export default PokemonInfoModal;
