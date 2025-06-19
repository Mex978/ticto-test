"use client";

import { useForm } from "react-hook-form";
import { IAddTransactionModal, IAddTransactionModalFormData } from "./data";
import { AddTransactionModal as Layout } from "./Layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const transactionSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  value: z.number().min(1, "Valor muito baixo"),
  type: z.enum(["income", "expense"]),
  category: z.string().min(2, "Categoria muito curta"),
});

export const AddTransactionModal: React.FC<IAddTransactionModal> = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<IAddTransactionModalFormData>({
    resolver: zodResolver(transactionSchema),
  });

  const onSubmit = async (data: IAddTransactionModalFormData) => {
    console.log(data);
    // await fetch('/api/contato', { method: 'POST', body: JSON.stringify(data) })
    reset();
  };

  const layoutProps = {
    ...props,
    control,
    isLoading,
    handleSubmit: handleSubmit(onSubmit),
  };

  return <Layout {...layoutProps} />;
};
