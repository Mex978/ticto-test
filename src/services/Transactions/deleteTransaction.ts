import { api } from "@/lib/api";

export async function deleteTransaction(id: string) {
  try {
    await api(`/transactions/${id}`, {
      method: "DELETE",
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}
