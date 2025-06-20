import { api } from "@/lib/api";
import { Transaction } from "@/types";

interface IGetTransactionsResponse {
  data: Transaction[];
}

export const getTransactions = async () => {
  try {
    const res = await api.get<IGetTransactionsResponse>("/transactions");
    return Promise.resolve(res.data.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
