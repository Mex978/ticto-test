"use client";

import { DeleteTransactionModal as Layout } from "./Layout";
import { IDeleteTransactionModal } from "./data";
import { useContext, useState } from "react";
import TransactionsContext from "@/context/TransactionContext";

export const DeleteTransactionModal: React.FC<IDeleteTransactionModal> = (
  props
) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showDeleteTransactionModal, setShowDeleteTransactionModal } =
    useContext(TransactionsContext);

  const layoutProps = {
    ...props,
    isOpen: showDeleteTransactionModal,
    onClose: () => setShowDeleteTransactionModal(false),
    isLoading,
  };

  return <Layout {...layoutProps} />;
};
