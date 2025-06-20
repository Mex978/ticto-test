"use client";

import { useForm } from "react-hook-form";
import { IAddTransactionModal, IAddTransactionModalFormData } from "./data";
import { AddTransactionModal as Layout } from "./Layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import TransactionsContext from "@/context/TransactionContext";

const transactionSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  value: z.number().min(1, "Valor muito baixo"),
  type: z.enum(["deposit", "withdraw"]),
  category: z.string().min(2, "Categoria muito curta"),
});

export const AddTransactionModal: React.FC<IAddTransactionModal> = (props) => {
  const { showAddTransactionModal, setShowAddTransactionModal } =
    useContext(TransactionsContext);

  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid },
  } = useForm<IAddTransactionModalFormData>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: IAddTransactionModalFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // await fetch('/api/contato', { method: 'POST', body: JSON.stringify(data) })
    setIsLoading(false);
    reset();
    setShowAddTransactionModal(false);
  };

  const layoutProps = {
    ...props,
    isOpen: showAddTransactionModal,
    onClose: () => setShowAddTransactionModal(false),
    control,
    isLoading,
    errors,
    isValid,
    handleSubmit: handleSubmit(onSubmit),
  };

  return <Layout {...layoutProps} />;
};
