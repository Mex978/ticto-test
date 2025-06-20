import { api } from "@/lib/api";
import { Transaction } from "@/types";

export interface ICreateTransactionRequest
  extends Omit<Transaction, "id" | "createdAt"> {}

interface ICreateTransactionResponse {
  data: Transaction;
}

export async function createTransaction(
  data: ICreateTransactionRequest
): Promise<Transaction> {
  try {
    const res = await api.post<ICreateTransactionResponse>(
      "/transactions",
      data
    );
    return Promise.resolve(res.data.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
