import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { ResultSession } from "./";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));

describe("ResultSession", () => {
  test("should render all result cards", () => {
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
        {
          id: "2",
          description: "description",
          value: 5500,
          type: "withdraw" as const,
          category: "category",
          createdAt: "2025-06-20T14:00:00.000Z",
        },
      ],
      isLoading: false,
    });

    render(<ResultSession />);

    const cards = screen.getAllByTestId("result-card");

    expect(cards).toHaveLength(3);

    const incomeCard = cards[0];
    const withdrawCard = cards[1];
    const balanceCard = cards[2];

    expect(incomeCard).toHaveTextContent("Entradas");
    expect(withdrawCard).toHaveTextContent("Saídas");
    expect(balanceCard).toHaveTextContent("Saldo Total");

    expect(incomeCard).toHaveTextContent("R$ 100,00");
    expect(withdrawCard).toHaveTextContent("R$ 55,00");
    expect(balanceCard).toHaveTextContent("R$ 45,00");
  });

  test("should render loader when isLoading is true", () => {
    (useContext as jest.Mock).mockReturnValue({
      transactions: [],
      isLoading: true,
    });

    render(<ResultSession />);

    expect(screen.getAllByTestId("loader")).toHaveLength(3);
  });
});
