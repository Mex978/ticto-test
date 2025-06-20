"use client";

import React, { createContext, ReactNode, useState } from "react";

import { Transaction } from "@/types";

type TransactionsContextType = {
  transactions: Transaction[];
  showAddTransactionModal: boolean;
  showDeleteTransactionModal: boolean;
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  setShowAddTransactionModal: (show: boolean) => void;
  setShowDeleteTransactionModal: (show: boolean) => void;
};

const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  showAddTransactionModal: false,
  showDeleteTransactionModal: false,
  addTransaction: () => {},
  removeTransaction: () => {},
  setShowAddTransactionModal: () => {},
  setShowDeleteTransactionModal: () => {},
});

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showDeleteTransactionModal, setShowDeleteTransactionModal] =
    useState(false);

  const addTransaction = (transaction: Transaction) =>
    setTransactions((prev) => [...prev, transaction]);

  const removeTransaction = (id: string) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        showAddTransactionModal,
        showDeleteTransactionModal,
        setShowAddTransactionModal,
        setShowDeleteTransactionModal,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
