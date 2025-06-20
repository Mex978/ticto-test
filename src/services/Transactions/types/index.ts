import { Transaction } from "@/types";

export interface ICreateTransactionRequest
  extends Omit<Transaction, "id" | "createdAt"> {}

export interface ICreateTransactionResponse {
  data: Transaction;
}

export interface IGetTransactionsResponse {
  data: Transaction[];
}
