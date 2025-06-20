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

  function handleTypeChange(type: TransactionType) {
    setType(type);
    onChange(type);
  }

  return (
    <div className={styles.container}>
      <button
        type="button"
        aria-label="Entrada"
        className={`${styles.radioButton} ${
          type === "deposit" ? styles.selected : ""
        }`}
        onClick={() => handleTypeChange("deposit")}
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
        onClick={() => handleTypeChange("withdraw")}
      >
        <ArrowCircleUp className={styles.withdrawIcon} />
        Saída
      </button>
    </div>
  );
}
