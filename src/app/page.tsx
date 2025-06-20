"use client";

import { AddTransactionModal } from "@/components/AddTransactionModal";
import { DeleteTransactionModal } from "@/components/DeleteTransactionModal";
import { Header } from "@/components/Header";
import { Home } from "@/components/Home";
import TransactionsContext from "@/context/TransactionContext";
import { useContext } from "react";

export default function MainPage() {
  return (
    <main>
      <Header />
      <Home />
      <AddTransactionModal />
      <DeleteTransactionModal />
    </main>
  );
}
