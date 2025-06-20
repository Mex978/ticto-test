"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

import { deleteTransaction, getTransactions } from "@/services/Transactions";
import { createTransaction } from "@/services/Transactions/createTransaction";
import { ICreateTransactionRequest } from "@/services/Transactions/types";
import { Transaction } from "@/types";
import { toast } from "react-toastify";
import { TransactionsContextType } from "./types";

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

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);

      const transactions = await getTransactions();
      setTransactions(transactions);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  const addTransaction = useCallback(
    async (transaction: ICreateTransactionRequest) => {
      try {
        const newTransaction = await createTransaction(transaction);
        setTransactions((prev) => [...prev, newTransaction]);
        toast.success("Transação adicionada com sucesso");
      } catch (error) {
        toast.error("Erro ao adicionar transação");
      }
    },
    []
  );

  const removeTransaction = useCallback(async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      toast.success("Transação removida com sucesso");
    } catch (error) {
      toast.error("Erro ao remover transação");
    }
  }, []);

  const handleChangeAddTransactionModal = useCallback((show: boolean) => {
    setShowAddTransactionModal(show);
  }, []);

  const handleChangeDeleteTransactionModal = useCallback(
    (show: boolean, id?: string) => {
      setShowDeleteTransactionModal(show);

      if (show) {
        setIdToDelete(id ?? "");
      } else {
        setIdToDelete("");
      }
    },
    []
  );

  const contextValue: TransactionsContextType = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  return (
    <TransactionsContext.Provider value={contextValue}>
      {children}
    </TransactionsContext.Provider>
  );
};

export default TransactionsContext;
