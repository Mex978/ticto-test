import React, { useContext } from "react";
import { IHeader } from "./data";
import { Header as Layout } from "./Layout";
import TransactionsContext from "@/context/TransactionContext";

export const Header: React.FC<IHeader> = (props) => {
  const { handleChangeAddTransactionModal } = useContext(TransactionsContext);

  const layoutProps = {
    ...props,
    handleChangeAddTransactionModal,
  };

  return <Layout {...layoutProps} />;
};
