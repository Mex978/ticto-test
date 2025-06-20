import React from "react";
import { Logo } from "../components/Logo";
import { IHeaderLayout } from "../data";

import styles from "./styles.module.scss";

export const Header: React.FC<IHeaderLayout> = ({
  handleChangeAddTransactionModal,
}) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <button
          type="button"
          aria-label="Nova transação"
          onClick={() => {
            handleChangeAddTransactionModal(true);
          }}
        >
          NOVA TRANSAÇÃO
        </button>
      </div>
    </header>
  );
};
