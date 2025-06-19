export type Transaction = {
  id: string;
  description: string;
  value: number;
  category: string;
  createdAt: string;
  type: "deposit" | "withdraw";
};
