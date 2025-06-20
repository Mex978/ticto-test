"use client";

import React, { useContext, useEffect } from "react";

import TransactionsContext from "@/context/TransactionContext";
import { IHome } from "./data";
import { Home as Layout } from "./Layout";

export const Home: React.FC<IHome> = (props) => {
  const { fetchTransactions } = useContext(TransactionsContext);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const layoutProps = {
    ...props,
  };

  return <Layout {...layoutProps} />;
};
