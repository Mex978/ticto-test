export type Transaction = {
  id: string;
  description: string;
  value: number;
  category: string;
  createdAt: string;
  type: TransactionType;
};

export type TransactionType = "deposit" | "withdraw";
