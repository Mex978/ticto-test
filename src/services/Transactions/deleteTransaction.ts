import { api } from "@/lib/api";

export const deleteTransaction = async (id: string) => {
  try {
    await api.delete(`/transactions/${id}`);
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
