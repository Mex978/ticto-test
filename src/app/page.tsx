"use client";

import { AddTransactionModal } from "@/components/AddTransactionModal";
import { Header } from "@/components/Header";
import { Home } from "@/components/Home";
import TransactionsContext from "@/context/TransactionContext";
import { useContext } from "react";

export default function MainPage() {
  const { showAddTransactionModal, setShowAddTransactionModal } =
    useContext(TransactionsContext);

  return (
    <main>
      <Header />
      <Home />
      <AddTransactionModal
        isOpen={showAddTransactionModal}
        onClose={() => {
          setShowAddTransactionModal(false);
        }}
      />
    </main>
  );
}
