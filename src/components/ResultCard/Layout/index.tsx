import { IResultCardLayout } from "../data";

import styles from "./styles.module.scss";

export const ResultCard: React.FC<IResultCardLayout> = ({
  type,
  title,
  value,
  icon,
}) => {
  return (
    <div className={`${styles.container} ${type && styles[type]}`}>
      <div className={`${styles.header} ${type && styles[type]}`}>
        <p>{title}</p>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
      <strong className={`${styles.value} ${type && styles[type]}`}>
        {value}
      </strong>
    </div>
  );
};
