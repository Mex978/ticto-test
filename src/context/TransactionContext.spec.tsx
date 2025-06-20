import * as TransactionServices from "@/services/Transactions";
import { act, renderHook } from "@testing-library/react";
import React, { useContext } from "react";
import { toast } from "react-toastify";
import TransactionsContext, {
  TransactionsProvider,
} from "./TransactionContext";

jest.mock("@/services/Transactions/createTransaction");
jest.mock("@/services/Transactions/deleteTransaction");
jest.mock("@/services/Transactions/getTransactions");
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const Consumer = () => {
  const context = React.useContext(TransactionsContext);
  return (
    <>
      <button onClick={() => context.handleChangeAddTransactionModal(true)}>
        Open Add Modal
      </button>
      <span data-testid="addModalState">
        {context.showAddTransactionModal ? "open" : "closed"}
      </span>
    </>
  );
};

const wrapper = ({ children }: any) => (
  <TransactionsProvider>{children}</TransactionsProvider>
);

describe("TransactionsContext", () => {
  const mockTransaction = {
    id: "1",
    description: "description",
    value: 100,
    type: "deposit" as const,
    category: "category",
    createdAt: "2025-06-20T00:00:00.000Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should open add transaction modal", () => {
    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    expect(result.current.showAddTransactionModal).toBe(false);

    act(() => {
      result.current.handleChangeAddTransactionModal(true);
    });

    expect(result.current.showAddTransactionModal).toBe(true);
  });

  it("should add a transaction", async () => {
    const createTransactionSpy = jest
      .spyOn(TransactionServices, "createTransaction")
      .mockImplementation((data) => {
        return Promise.resolve({
          id: "mocked-id",
          createdAt: new Date().toISOString(),
          ...data,
        });
      });

    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    await act(async () => {
      await result.current.addTransaction({
        description: "Test Transaction",
        value: 200,
        category: "category",
        type: "deposit",
      });
    });

    expect(result.current.transactions).toHaveLength(1);
    expect(result.current.transactions[0].description).toBe("Test Transaction");
    expect(createTransactionSpy).toHaveBeenCalled();
    expect(toast.success).toHaveBeenCalledWith(
      "Transação adicionada com sucesso"
    );
  });

  it("should show error when addTransaction fails", async () => {
    const error = new Error("Erro ao adicionar");
    jest
      .spyOn(TransactionServices, "createTransaction")
      .mockRejectedValueOnce(error);

    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    await act(async () => {
      await result.current.addTransaction({
        description: "description",
        value: 100,
        category: "category",
        type: "deposit",
      });
    });

    expect(toast.error).toHaveBeenCalledWith("Erro ao adicionar transação");
  });

  it("should remove a transaction", async () => {
    jest
      .spyOn(TransactionServices, "createTransaction")
      .mockResolvedValue(mockTransaction);

    const deleteTransactionSpy = jest
      .spyOn(TransactionServices, "deleteTransaction")
      .mockResolvedValue(undefined);

    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    await act(async () => {
      await result.current.addTransaction({
        description: "Job",
        value: 500,
        category: "Work",
        type: "deposit",
      });
    });

    const id = result.current.transactions[0].id;

    await act(async () => {
      await result.current.removeTransaction(id);
    });

    expect(deleteTransactionSpy).toHaveBeenCalledWith("1");
    expect(result.current.transactions).toHaveLength(0);
    expect(toast.success).toHaveBeenCalledWith(
      "Transação removida com sucesso"
    );
  });

  it("should show error when removeTransaction fails", async () => {
    const error = new Error("Erro ao remover");

    jest
      .spyOn(TransactionServices, "createTransaction")
      .mockResolvedValue(mockTransaction);
    jest
      .spyOn(TransactionServices, "deleteTransaction")
      .mockRejectedValueOnce(error);

    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    await act(async () => {
      await result.current.addTransaction({
        description: "Job",
        value: 500,
        category: "Work",
        type: "deposit",
      });
    });

    const id = result.current.transactions[0].id;

    await act(async () => {
      await result.current.removeTransaction(id);
    });

    expect(toast.error).toHaveBeenCalledWith("Erro ao remover transação");
  });

  it("should fetch transactions", async () => {
    const getTransactionsSpy = jest
      .spyOn(TransactionServices, "getTransactions")
      .mockResolvedValue([mockTransaction]);

    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    await act(async () => {
      await result.current.fetchTransactions();
    });

    expect(result.current.transactions).toHaveLength(1);
    expect(getTransactionsSpy).toHaveBeenCalled();
  });

  it("should show error when fetchTransactions fails", async () => {
    const error = new Error("Erro ao buscar");
    jest
      .spyOn(TransactionServices, "getTransactions")
      .mockRejectedValueOnce(error);

    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    await act(async () => {
      await result.current.fetchTransactions();
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("should set id to delete", () => {
    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    act(() => {
      result.current.setIdToDelete("999");
    });

    expect(result.current.idToDelete).toBe("999");
  });

  it("should toggle add transaction modal", () => {
    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    act(() => {
      result.current.handleChangeAddTransactionModal(true);
    });

    expect(result.current.showAddTransactionModal).toBe(true);
  });

  it("should toggle delete modal and set ID", () => {
    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    act(() => {
      result.current.handleChangeDeleteTransactionModal(true, "123");
    });

    expect(result.current.showDeleteTransactionModal).toBe(true);
    expect(result.current.idToDelete).toBe("123");
  });

  it("should toggle delete modal and set ID to empty string", () => {
    const { result } = renderHook(() => useContext(TransactionsContext), {
      wrapper,
    });

    act(() => {
      result.current.handleChangeDeleteTransactionModal(false);
    });

    expect(result.current.showDeleteTransactionModal).toBe(false);
    expect(result.current.idToDelete).toBe("");
  });
});
