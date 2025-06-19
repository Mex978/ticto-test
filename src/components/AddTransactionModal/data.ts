import { Control } from "react-hook-form";

export interface IAddTransactionModal {
  isOpen: boolean;
  onClose: () => void;
}

export interface IAddTransactionModalLayout extends IAddTransactionModal {
  control?: Control<
    IAddTransactionModalFormData,
    any,
    IAddTransactionModalFormData
  >;
  isLoading: boolean;
  handleSubmit: () => void;
}

export interface IAddTransactionModalFormData {
  name: string;
  value: number;
  type: "income" | "expense";
  category: string;
}
