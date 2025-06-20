import { TransactionType } from "@/types/Transaction";
import { Control, FieldErrors } from "react-hook-form";

export interface IAddTransactionModal {}

export interface IAddTransactionModalLayout extends IAddTransactionModal {
  isOpen: boolean;
  onClose: () => void;
  control?: Control<
    IAddTransactionModalFormData,
    any,
    IAddTransactionModalFormData
  >;
  isLoading: boolean;
  handleSubmit: () => void;
  errors: FieldErrors<IAddTransactionModalFormData>;
  isValid: boolean;
}

export interface IAddTransactionModalFormData {
  name: string;
  value: number;
  type: TransactionType;
  category: string;
}
