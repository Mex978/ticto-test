"use client";

import React, { createContext, ReactNode, useState } from "react";

import { Transaction } from "@/types";

type TransactionsContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
};

const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  addTransaction: () => {},
  removeTransaction: () => {},
});

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) =>
    setTransactions((prev) => [...prev, transaction]);

  const removeTransaction = (id: string) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <TransactionsContext.Provider
      value={{ transactions, addTransaction, removeTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
