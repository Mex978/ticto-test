import React, { useContext, useEffect } from "react";
import { IHome } from "./data";
import { Home as Layout } from "./Layout";
import TransactionsContext from "@/context/TransactionContext";

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
