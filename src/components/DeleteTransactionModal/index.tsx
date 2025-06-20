"use client";

import TransactionsContext from "@/context/TransactionContext";
import { useContext, useState } from "react";
import { DeleteTransactionModal as Layout } from "./Layout";
import { IDeleteTransactionModal } from "./data";

export const DeleteTransactionModal: React.FC<IDeleteTransactionModal> = (
  props
) => {
  const {
    showDeleteTransactionModal,
    handleChangeDeleteTransactionModal,
    removeTransaction,
    idToDelete,
  } = useContext(TransactionsContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteTransaction = async () => {
    setIsLoading(true);
    await removeTransaction(idToDelete);
    setIsLoading(false);
    handleChangeDeleteTransactionModal(false);
  };

  const layoutProps = {
    ...props,
    isOpen: showDeleteTransactionModal,
    onClose: () => handleChangeDeleteTransactionModal(false),
    isLoading,
    handleDeleteTransaction,
  };

  return <Layout {...layoutProps} />;
};
