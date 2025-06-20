import { Transaction } from "@/types";

export interface ITableSession {}

export interface ITableSessionLayout extends ITableSession {
  items: Transaction[];
  isLoading: boolean;
  showDeleteTransactionModal: boolean;
  handleChangeDeleteTransactionModal: (show: boolean, id?: string) => void;
}
