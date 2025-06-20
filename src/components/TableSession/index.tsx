import TransactionsContext from "@/context/TransactionContext";
import { useContext } from "react";
import { ITableSession } from "./data";
import { TableSession as Layout } from "./Layout";

export const TableSession: React.FC<ITableSession> = (props) => {
  const {
    transactions: items,
    isLoading,
    showDeleteTransactionModal,
    handleChangeDeleteTransactionModal,
  } = useContext(TransactionsContext);

  const layoutProps = {
    ...props,
    items,
    isLoading,
    showDeleteTransactionModal,
    handleChangeDeleteTransactionModal,
  };

  return <Layout {...layoutProps} />;
};
