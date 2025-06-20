import { describe, it, expect, beforeEach } from "@jest/globals";
import { getAll, create, remove } from "./transactions";

describe("Transactions", () => {
  beforeEach(() => {
    const transactions = getAll();
    while (transactions.length > 0) {
      remove(transactions[0].id);
    }
  });

  it("should start with empty transactions", () => {
    const transactions = getAll();
    expect(transactions).toHaveLength(0);
  });

  it("should create a new transaction", () => {
    const newTransaction = create({
      description: "description",
      value: 1000,
      category: "category",
      type: "deposit",
    });

    expect(newTransaction).toHaveProperty("id");
    expect(newTransaction).toHaveProperty("createdAt");
    expect(newTransaction.description).toBe("description");
    expect(newTransaction.value).toBe(1000);
    expect(newTransaction.category).toBe("category");
    expect(newTransaction.type).toBe("deposit");

    const transactions = getAll();
    expect(transactions).toHaveLength(1);
    expect(transactions[0]).toEqual(newTransaction);
  });

  it("should remove a transaction", () => {
    const transaction = create({
      description: "description",
      value: 500,
      category: "category",
      type: "withdraw",
    });

    const result = remove(transaction.id);
    expect(result).toBe(true);

    const transactions = getAll();
    expect(transactions).toHaveLength(0);
  });

  it("should return false when trying to remove non-existent transaction", () => {
    const result = remove("non-existent-id");
    expect(result).toBe(false);
  });
});
