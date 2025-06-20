import { Transaction } from "@/types";

let transactions: Transaction[] = [];

export function getAll() {
  return transactions;
}

export function create(
  data: Omit<Transaction, "id" | "createdAt">
): Transaction {
  const newTransaction = {
    id: crypto.randomUUID(),
    ...data,
    createdAt: new Date().toISOString(),
  };
  transactions.push(newTransaction);
  return newTransaction;
}

export function remove(id: string) {
  const index = transactions.findIndex((transaction) => transaction.id === id);
  if (index === -1) return false;

  transactions.splice(index, 1);
  return true;
}
