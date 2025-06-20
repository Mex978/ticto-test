import TransactionsContext from "@/context/TransactionContext";
import { IResultSession } from "./data";

import { ResultSession as Layout } from "./Layout";
import { useContext, useMemo } from "react";
import { formatCurrency } from "@/helpers/functions/formatCurrency";
import { FiArrowDownLeft, FiArrowUpRight } from "react-icons/fi";

export const ResultSession: React.FC<IResultSession> = (props) => {
  const { transactions, isLoading } = useContext(TransactionsContext);

  const totalDeposit = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      return acc + (transaction.type === "deposit" ? transaction.value : 0);
    }, 0);
  }, [transactions]);

  const totalWithdraw = useMemo(() => {
    return transactions.reduce((acc, transaction) => {
      return acc + (transaction.type === "withdraw" ? transaction.value : 0);
    }, 0);
  }, [transactions]);

  const totalBalance = useMemo(() => {
    return totalDeposit - totalWithdraw;
  }, [totalDeposit, totalWithdraw]);

  const items = [
    {
      title: "Entradas",
      icon: <FiArrowDownLeft size={28} color="#06D6A2" />,
      value: formatCurrency(totalDeposit),
    },
    {
      title: "Saídas",
      icon: <FiArrowUpRight size={28} color="#DB3766" />,
      value: formatCurrency(totalWithdraw),
    },
    {
      title: "Saldo Total",
      icon: <FiArrowDownLeft size={28} color="#06D6A2" />,
      value: formatCurrency(totalBalance),
    },
  ];

  const layoutProps = {
    ...props,
    isLoading,
    items,
  };

  return <Layout {...layoutProps} />;
};
