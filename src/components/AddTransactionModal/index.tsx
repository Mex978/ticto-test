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
  const {
    showAddTransactionModal,
    handleChangeAddTransactionModal,
    addTransaction,
  } = useContext(TransactionsContext);

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
    await addTransaction({
      description: data.name,
      value: data.value,
      type: data.type,
      category: data.category,
    });
    setIsLoading(false);
    reset();
    handleChangeAddTransactionModal(false);
  };

  const layoutProps = {
    ...props,
    isOpen: showAddTransactionModal,
    onClose: () => handleChangeAddTransactionModal(false),
    control,
    isLoading,
    errors,
    isValid,
    handleSubmit: handleSubmit(onSubmit),
  };

  return <Layout {...layoutProps} />;
};
