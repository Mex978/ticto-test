import { Transaction } from "@/types";

export interface ITableSession {}

export interface ITableSessionLayout extends ITableSession {
  items: Transaction[];
  showDeleteTransactionModal: boolean;
  setShowDeleteTransactionModal: (show: boolean) => void;
}
