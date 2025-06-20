"use client";

import { Transaction } from "@/types";
import { ITableSession } from "./data";

import { TableSession as Layout } from "./Layout";
import { useContext } from "react";
import TransactionsContext from "@/context/TransactionContext";

export const TableSession: React.FC<ITableSession> = (props) => {
  const {
    transactions: items,
    isLoading,
    showDeleteTransactionModal,
    handleChangeDeleteTransactionModal,
  } = useContext(TransactionsContext);

  const layoutProps = {
    ...props,
    items,
    isLoading,
    showDeleteTransactionModal,
    handleChangeDeleteTransactionModal,
  };

  return <Layout {...layoutProps} />;
};
