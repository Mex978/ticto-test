import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("should format date string correctly", () => {
    const dateString = "2025-06-20T14:30:00.000Z";
    expect(formatDate(dateString)).toBe("20/06/2025 às 11:30");
  });

  it("should format Date object correctly", () => {
    const date = new Date(2025, 5, 20, 14, 30);
    expect(formatDate(date)).toBe("20/06/2025 às 14:30");
  });

  it("should pad single digit numbers with zeros", () => {
    const date = new Date(2025, 0, 5, 9, 5);
    expect(formatDate(date)).toBe("05/01/2025 às 09:05");
  });
});
