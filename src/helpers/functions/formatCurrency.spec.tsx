import { formatCurrency } from "./formatCurrency";

describe("formatCurrency", () => {
  it("should format string value correctly", () => {
    expect(formatCurrency("1000").replace(/\u00A0/g, " ")).toBe("R$ 10,00");
    expect(formatCurrency("150050").replace(/\u00A0/g, " ")).toBe(
      "R$ 1.500,50"
    );
    expect(formatCurrency("0").replace(/\u00A0/g, " ")).toBe("R$ 0,00");
    expect(formatCurrency("").replace(/\u00A0/g, " ")).toBe("R$ 0,00");
  });

  it("should format number value correctly", () => {
    expect(formatCurrency(1000).replace(/\u00A0/g, " ")).toBe("R$ 10,00");
    expect(formatCurrency(150050).replace(/\u00A0/g, " ")).toBe("R$ 1.500,50");
    expect(formatCurrency(0).replace(/\u00A0/g, " ")).toBe("R$ 0,00");
  });

  it("should handle string with non-numeric characters", () => {
    expect(formatCurrency("R$1.000,00").replace(/\u00A0/g, " ")).toBe(
      "R$ 1.000,00"
    );
    expect(formatCurrency("abc123def456").replace(/\u00A0/g, " ")).toBe(
      "R$ 1.234,56"
    );
  });
});
