"use client";

import { Transaction } from "@/types";
import { ITableSession } from "./data";

import { TableSession as Layout } from "./Layout";
import { useContext } from "react";
import TransactionsContext from "@/context/TransactionContext";

// TODO: Remove this mock data
const items = Array.from(
  { length: 100 },
  (_, index) =>
    ({
      id: `${index + 1}`,
      description: `Descrição ${index + 1}`,
      value: (index + 1) * 100000,
      category: Math.random() > 0.5 ? "Educação" : "Receita Fixa",
      createdAt: new Date().toISOString(),
      type: Math.random() > 0.5 ? "withdraw" : "deposit",
    } as Transaction)
);

export const TableSession: React.FC<ITableSession> = (props) => {
  const { showDeleteTransactionModal, setShowDeleteTransactionModal } =
    useContext(TransactionsContext);

  const layoutProps = {
    ...props,
    items,
    showDeleteTransactionModal,
    setShowDeleteTransactionModal,
  };

  return <Layout {...layoutProps} />;
};
