import { api } from "@/lib/api";
import { Transaction } from "@/types";
import { ICreateTransactionRequest, ICreateTransactionResponse } from "./types";

export async function createTransaction(
  data: ICreateTransactionRequest
): Promise<Transaction> {
  try {
    const res = await api<ICreateTransactionResponse>("/transactions", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
