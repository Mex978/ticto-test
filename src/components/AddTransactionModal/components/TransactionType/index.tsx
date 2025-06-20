"use client";
import { TransactionType } from "@/types/Transaction";
import { ArrowCircleDown, ArrowCircleUp } from "phosphor-react";
import { useState } from "react";

import styles from "./styles.module.scss";

export function TransactionTypeSelector({
  onChange,
}: {
  onChange: (type: TransactionType) => void;
}) {
  const [type, setType] = useState<TransactionType | null>(null);

  return (
    <div className={styles.container}>
      <button
        type="button"
        aria-label="Entrada"
        className={`${styles.radioButton} ${
          type === "deposit" ? styles.selected : ""
        }`}
        onClick={() => {
          setType("deposit");
          onChange("deposit");
        }}
      >
        <ArrowCircleDown className={styles.depositIcon} />
        Entrada
      </button>

      <button
        type="button"
        aria-label="Saída"
        className={`${styles.radioButton} ${
          type === "withdraw" ? styles.selected : ""
        }`}
        onClick={() => {
          setType("withdraw");
          onChange("withdraw");
        }}
      >
        <ArrowCircleUp className={styles.withdrawIcon} />
        Saída
      </button>
    </div>
  );
}
