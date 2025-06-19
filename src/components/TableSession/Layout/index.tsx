"use client";

import { formatCurrency } from "@/helpers/functions/formatCurrency";
import { ITableSessionLayout } from "../data";

import { formatDate } from "@/helpers/functions/formatDate";
import { Transaction } from "@/types";
import { FiTrash } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";

export const TableSession: React.FC<ITableSessionLayout> = ({ items }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const TableHeaderResult = isMobile ? TableHeaderMobile : TableHeaderDesktop;
  const TableItemResult = isMobile ? TableItemMobile : TableItemDesktop;

  return (
    <div className={styles.container}>
      <TableHeaderResult items={items} />

      <ul className={styles.content}>
        {items.map((item) => (
          <TableItemResult key={item.id} {...item} />
        ))}
      </ul>
    </div>
  );
};

const TableHeaderMobile: React.FC<{ items: Transaction[] }> = ({ items }) => {
  return (
    <p className={styles.headerMobile}>
      <span>({items.length})</span> transações
    </p>
  );
};

const TableHeaderDesktop: React.FC = () => {
  return (
    <ul className={styles.header}>
      <li>Descrição</li>
      <li>Valor</li>
      <li>Categoria</li>
      <li>Data</li>
    </ul>
  );
};

const TableItemMobile: React.FC<Transaction> = (item) => {
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
        <button aria-label="Excluir transação">
          <FiTrash size={16} color="#DB3766" />
        </button>
        <span>{formatDate(item.createdAt)}</span>
      </div>
    </li>
  );
};

const TableItemDesktop: React.FC<Transaction> = (item) => {
  return (
    <li className={styles.itemDesktop} key={item.id}>
      <p>{item.description}</p>
      <strong className={`${styles.value} ${styles[item.type]}`}>
        {formatCurrency(item.value)}
      </strong>
      <p>{item.category}</p>
      <p>{formatDate(item.createdAt)}</p>
      <button className={styles.delete} aria-label="Excluir transação">
        <FiTrash size={16} color="#DB3766" />
      </button>
    </li>
  );
};
