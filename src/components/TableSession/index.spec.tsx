import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { useMediaQuery } from "react-responsive";
import { TableSession } from ".";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));
jest.mock("react-responsive", () => ({
  ...jest.requireActual("react-responsive"),
  useMediaQuery: jest.fn(),
}));

describe("TransactionsTable", () => {
  test("should render the loader when isLoading is true", () => {
    (useContext as jest.Mock).mockReturnValue({
      transactions: [],
      isLoading: true,
    });

    render(<TableSession />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("should render the table session empty when isLoading is false and transactions is empty", () => {
    (useContext as jest.Mock).mockReturnValue({
      transactions: [],
      isLoading: false,
    });

    render(<TableSession />);

    expect(
      screen.getByText("Nenhuma transação encontrada")
    ).toBeInTheDocument();
  });

  test("should render the table session correctly", () => {
    (useContext as jest.Mock).mockReturnValue({
      transactions: [
        {
          id: "1",
          description: "description",
          value: 10000,
          type: "deposit" as const,
          category: "category",
          createdAt: "2025-06-20T14:00:00.000Z",
        },
      ],
      isLoading: false,
    });

    render(<TableSession />);

    const title = screen.getByText("description");
    const value = screen.getByText("R$ 100,00");
    const category = screen.getByText("category");
    const date = screen.getByText("20/06/2025 às 11:00");

    expect(screen.queryByText("Descrição")).toBeInTheDocument();
    expect(screen.queryByText("Valor")).toBeInTheDocument();
    expect(screen.queryByText("Categoria")).toBeInTheDocument();
    expect(screen.queryByText("Data")).toBeInTheDocument();

    expect(screen.queryByText("transação")).not.toBeInTheDocument();

    expect(title).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(date).toBeInTheDocument();
  });

  test("should render the table session correctly when in mobile", () => {
    (useMediaQuery as jest.Mock).mockReturnValue(true);
    (useContext as jest.Mock).mockReturnValue({
      transactions: [
        {
          id: "1",
          description: "description",
          value: 10000,
          type: "deposit" as const,
          category: "category",
          createdAt: "2025-06-20T14:00:00.000Z",
        },
      ],
      isLoading: false,
    });

    render(<TableSession />);

    expect(screen.queryByText("Descrição")).not.toBeInTheDocument();
    expect(screen.queryByText("Valor")).not.toBeInTheDocument();
    expect(screen.queryByText("Categoria")).not.toBeInTheDocument();
    expect(screen.queryByText("Data")).not.toBeInTheDocument();

    expect(screen.getByText("transação")).toBeInTheDocument();
  });
});
