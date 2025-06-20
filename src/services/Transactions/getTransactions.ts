import { api } from "@/lib/api";
import { IGetTransactionsResponse } from "./types";

export async function getTransactions() {
  try {
    const res = await api<IGetTransactionsResponse>("/transactions", {
      method: "GET",
    });
    return Promise.resolve(res.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
