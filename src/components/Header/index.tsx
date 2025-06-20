"use client";

import React, { useContext } from "react";

import TransactionsContext from "@/context/TransactionContext";
import { IHeader } from "./data";
import { Header as Layout } from "./Layout";

export const Header: React.FC<IHeader> = (props) => {
  const { handleChangeAddTransactionModal } = useContext(TransactionsContext);

  const layoutProps = {
    ...props,
    handleChangeAddTransactionModal,
  };

  return <Layout {...layoutProps} />;
};
