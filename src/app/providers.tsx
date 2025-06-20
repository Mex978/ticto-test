import { TransactionsProvider } from "@/context/TransactionContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TransactionsProvider>
      <ToastContainer theme="colored" position="bottom-right" />
      {children}
    </TransactionsProvider>
  );
}
