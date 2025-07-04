import { ResultSession } from "@/components/ResultSession";
import { TableSession } from "@/components/TableSession";
import { IHomeLayout } from "../data";

import styles from "./styles.module.scss";

export const Home: React.FC<IHomeLayout> = () => {
  return (
    <main className={styles.wrapper}>
      <div className={styles.container}>
        <ResultSession />
        <TableSession />
      </div>
    </main>
  );
};
