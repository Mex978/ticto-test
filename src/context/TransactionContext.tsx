"use client";

import { createContext, ReactNode, useState } from "react";

import { deleteTransaction, getTransactions } from "@/services/Transactions";
import {
  createTransaction,
  ICreateTransactionRequest,
} from "@/services/Transactions/createTransaction";
import { Transaction } from "@/types";
import { toast } from "react-toastify";

type TransactionsContextType = {
  transactions: Transaction[];
  showAddTransactionModal: boolean;
  showDeleteTransactionModal: boolean;
  isLoading: boolean;
  idToDelete: string;
  setIdToDelete: (id: string) => void;
  addTransaction: (transaction: ICreateTransactionRequest) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
  handleChangeAddTransactionModal: (show: boolean) => void;
  handleChangeDeleteTransactionModal: (show: boolean, id?: string) => void;
  fetchTransactions: () => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextType>({
  transactions: [],
  showAddTransactionModal: false,
  showDeleteTransactionModal: false,
  isLoading: true,
  idToDelete: "",
  setIdToDelete: () => {},
  addTransaction: () => Promise.resolve(),
  removeTransaction: () => Promise.resolve(),
  fetchTransactions: () => Promise.resolve(),
  handleChangeAddTransactionModal: () => {},
  handleChangeDeleteTransactionModal: () => {},
});

export const TransactionsProvider = ({ children }: { children: ReactNode }) => {
  const [idToDelete, setIdToDelete] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddTransactionModal, setShowAddTransactionModal] = useState(false);
  const [showDeleteTransactionModal, setShowDeleteTransactionModal] =
    useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTransactions() {
    try {
      setIsLoading(true);
      const transactions = await getTransactions();
      setTransactions(transactions);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function addTransaction(transaction: ICreateTransactionRequest) {
    try {
      const newTransaction = await createTransaction(transaction);
      setTransactions((prev) => [...prev, newTransaction]);
      toast.success("Transação adicionada com sucesso");
    } catch (error) {
      toast.error("Erro ao adicionar transação");
    }
  }

  async function removeTransaction(id: string) {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transação removida com sucesso");
    } catch (error) {
      toast.error("Erro ao remover transação");
    }
  }

  function handleChangeAddTransactionModal(show: boolean) {
    setShowAddTransactionModal(show);
  }

  function handleChangeDeleteTransactionModal(show: boolean, id?: string) {
    setShowDeleteTransactionModal(show);

    if (show) {
      setIdToDelete(id ?? "");
    } else {
      setIdToDelete("");
    }
  }

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        idToDelete,
        setIdToDelete,
        removeTransaction,
        showAddTransactionModal,
        showDeleteTransactionModal,
        handleChangeAddTransactionModal,
        handleChangeDeleteTransactionModal,
        fetchTransactions,
        isLoading,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
