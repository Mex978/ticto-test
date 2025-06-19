"use client";

import Modal from "react-modal";
import { IAddTransactionModalLayout } from "../data";

import styles from "./styles.module.scss";
import { Input } from "../components/Input";
import { FiX } from "react-icons/fi";
import { Controller } from "react-hook-form";
import { formatCurrency } from "@/helpers/functions/formatCurrency";
import { TransactionType } from "../components/TransactionType";
import { CgSpinner } from "react-icons/cg";
import { useEffect } from "react";

export const AddTransactionModal: React.FC<IAddTransactionModalLayout> = ({
  isOpen,
  onClose,
  control,
  isLoading,
  handleSubmit,
}) => {
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={"modal-overlay"}
      className={"modal-content"}
      ariaHideApp={false}
    >
      <div className={styles.wrapper}>
        <button
          className={styles.closeButton}
          aria-label="Fechar modal"
          onClick={onClose}
        >
          <FiX size={28} color="#4E5555" />
        </button>

        <h1 className={styles.title}>Cadastrar Transação</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <Input placeholder="Nome" name="name" />
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) => {
                  const formatted = formatCurrency(e.target.value);
                  field.onChange(formatted);
                }}
                placeholder="Preço"
              />
            )}
          />
          <TransactionType
            onChange={(value) => {
              console.log(value);
            }}
          />

          <Input placeholder="Categoria" name="category" />
        </form>
        <button
          className={styles.button}
          onClick={onClose}
          disabled={isLoading}
          aria-label="Cadastrar transação"
        >
          {isLoading && <CgSpinner size={24} className={"spinner"} />}
          CADASTRAR
        </button>
      </div>
    </Modal>
  );
};
