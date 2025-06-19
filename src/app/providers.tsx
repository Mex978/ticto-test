import { TransactionsProvider } from "@/context/TransactionContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <TransactionsProvider>{children}</TransactionsProvider>;
}
