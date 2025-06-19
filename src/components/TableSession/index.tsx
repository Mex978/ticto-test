import { Transaction } from "@/types";
import { ITableSession } from "./data";

import { TableSession as Layout } from "./Layout";

export const TableSession: React.FC<ITableSession> = (props) => {
  // TODO: Remove this mock data
  const items = Array.from(
    { length: 100 },
    (_, index) =>
      ({
        id: `${index + 1}`,
        description: `Descrição ${index + 1}`,
        value: (index + 1) * 100000,
        category: Math.random() > 0.5 ? "Educação" : "Receita Fixa",
        createdAt: new Date().toISOString(),
        type: Math.random() > 0.5 ? "withdraw" : "deposit",
      } as Transaction)
  );

  const layoutProps = {
    ...props,
    items,
  };

  return <Layout {...layoutProps} />;
};
