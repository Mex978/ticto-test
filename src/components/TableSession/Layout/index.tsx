"use client";

import { formatCurrency } from "@/helpers/functions/formatCurrency";
import { ITableSessionLayout } from "../data";

import { formatDate } from "@/helpers/functions/formatDate";
import { Transaction } from "@/types";
import { FiTrash } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";
import { Loader } from "@/components/Loader";

interface ITableItem {
  item: Transaction;
  handleChangeDeleteTransactionModal: (show: boolean, id?: string) => void;
}

export const TableSession: React.FC<ITableSessionLayout> = ({
  items,
  isLoading,
  handleChangeDeleteTransactionModal,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const TableHeaderResult = isMobile ? TableHeaderMobile : TableHeaderDesktop;
  const TableItemResult = isMobile ? TableItemMobile : TableItemDesktop;

  if (isLoading) {
    return (
      <div className={styles.wrapperLoader}>
        <Loader size={32} />
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className={styles.wrapperEmpty}>
        <p>Nenhuma transação encontrada</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <TableHeaderResult items={items} />

      <ul className={styles.content}>
        {items.map((item) => (
          <TableItemResult
            key={item.id}
            item={item}
            handleChangeDeleteTransactionModal={
              handleChangeDeleteTransactionModal
            }
          />
        ))}
      </ul>
    </div>
  );
};

const TableHeaderMobile: React.FC<{ items: Transaction[] }> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <p className={styles.headerMobile}>
      <span>({items.length})</span> transaç{items.length === 1 ? "ão" : "ões"}
    </p>
  );
};

const TableHeaderDesktop: React.FC<{ items: Transaction[] }> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <ul className={styles.header}>
      <li>Descrição</li>
      <li>Valor</li>
      <li>Categoria</li>
      <li>Data</li>
    </ul>
  );
};

const TableItemMobile: React.FC<ITableItem> = ({
  item,
  handleChangeDeleteTransactionModal,
}) => {
  return (
    <li className={styles.itemMobile} key={item.id}>
      <div>
        <p>{item.description}</p>
        <strong className={`${styles.value} ${styles[item.type]}`}>
          {formatCurrency(item.value)}
        </strong>
        <span>{item.category}</span>
      </div>

      <div>
        <button
          aria-label="Excluir transação"
          onClick={() => handleChangeDeleteTransactionModal(true, item.id)}
        >
          <FiTrash size={16} color="#DB3766" />
        </button>
        <span>{formatDate(item.createdAt)}</span>
      </div>
    </li>
  );
};

const TableItemDesktop: React.FC<ITableItem> = ({
  item,
  handleChangeDeleteTransactionModal,
}) => {
  return (
    <li className={styles.itemDesktop} key={item.id}>
      <p>{item.description}</p>
      <strong className={`${styles.value} ${styles[item.type]}`}>
        {formatCurrency(item.value)}
      </strong>
      <p>{item.category}</p>
      <p>{formatDate(item.createdAt)}</p>
      <button
        className={styles.delete}
        aria-label="Excluir transação"
        onClick={() => handleChangeDeleteTransactionModal(true, item.id)}
      >
        <FiTrash size={16} color="#DB3766" />
      </button>
    </li>
  );
};
