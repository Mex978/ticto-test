"use client";

import { Loader } from "@/components/Loader";
import { formatCurrency } from "@/helpers/functions/formatCurrency";
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { FiX } from "react-icons/fi";
import Modal from "react-modal";
import { Input } from "../components/Input";
import { TransactionTypeSelector } from "../components/TransactionType";
import { IAddTransactionModalLayout } from "../data";

import styles from "./styles.module.scss";

export const AddTransactionModal: React.FC<IAddTransactionModalLayout> = ({
  isOpen,
  onClose,
  control,
  isLoading,
  errors,
  isValid,
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
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Nome"
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            name="value"
            control={control}
            render={({ field }) => {
              const { value, onChange, ...rest } = field;

              const parseValue = (formatted: string) => {
                const numericStr = formatted.replace(/[^\d]/g, "");
                const trimmed = numericStr.slice(0, 15);

                const number = Number(trimmed);
                return isNaN(number) ? 0 : number;
              };

              return (
                <Input
                  {...rest}
                  value={formatCurrency(value?.toString() ?? "")}
                  onChange={(e) => onChange(parseValue(e.target.value))}
                  placeholder="Preço"
                  error={errors.value?.message}
                />
              );
            }}
          />
          <Controller
            name="type"
            control={control}
            render={({ field }) => <TransactionTypeSelector {...field} />}
          />

          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Categoria"
                error={errors.category?.message}
              />
            )}
          />
          <button
            type="submit"
            className={styles.button}
            disabled={isLoading || !isValid}
            aria-label="Cadastrar transação"
          >
            {isLoading && <Loader size={24} />}
            CADASTRAR
          </button>
        </form>
      </div>
    </Modal>
  );
};
