import { api } from "@/lib/api";
import { Transaction } from "@/types";

interface IGetTransactionsResponse {
  data: Transaction[];
}

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
