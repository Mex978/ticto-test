import { ICreateTransactionRequest } from "@/services/Transactions/types";
import { Transaction } from "@/types";

export type TransactionsContextType = {
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
