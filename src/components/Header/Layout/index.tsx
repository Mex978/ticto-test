"use client";

import React from "react";

import { logo, logoMobile } from "@/assets";
import Image from "next/image";
import { IHeaderLayout } from "../data";

import styles from "./styles.module.scss";
import { useMediaQuery } from "react-responsive";

export const Header: React.FC<IHeaderLayout> = ({
  setShowAddTransactionModal,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Image
            src={isMobile ? logoMobile : logo}
            alt="Logo Ticto"
            width={isMobile ? 100 : 200}
            height={isMobile ? 85 : 50}
          />
        </div>
        <button
          type="button"
          aria-label="Nova transação"
          onClick={() => {
            setShowAddTransactionModal(true);
          }}
        >
          NOVA TRANSAÇÃO
        </button>
      </div>
    </header>
  );
};
