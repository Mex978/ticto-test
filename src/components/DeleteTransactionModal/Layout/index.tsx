"use client";

import Modal from "react-modal";
import { IDeleteTransactionModalLayout } from "../data";

import styles from "./styles.module.scss";
import { FiX } from "react-icons/fi";
import { useEffect } from "react";
import { Loader } from "@/components/Loader";

export const DeleteTransactionModal: React.FC<
  IDeleteTransactionModalLayout
> = ({ isOpen, onClose, isLoading, handleDeleteTransaction }) => {
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

        <h1 className={styles.title}>Deletar Transação</h1>

        <p className={styles.description}>
          Tem certeza que deseja excluir esta transação?
          <br />
          <strong>Essa ação não poderá ser desfeita.</strong>
        </p>

        <div className={styles.buttons_wrapper}>
          <button
            className={styles.cancel}
            aria-label="Cancelar exclusão"
            onClick={onClose}
          >
            CANCELAR
          </button>
          <button
            className={styles.delete}
            onClick={handleDeleteTransaction}
            disabled={isLoading}
            aria-label="Deletar transação"
          >
            {isLoading && <Loader size={24} />}
            EXCLUIR
          </button>
        </div>
      </div>
    </Modal>
  );
};
