export interface IDeleteTransactionModal {}

export interface IDeleteTransactionModalLayout extends IDeleteTransactionModal {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  handleDeleteTransaction: () => Promise<void>;
}
