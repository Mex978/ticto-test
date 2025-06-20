import { Loader } from "@/components/Loader";

import styles from "./styles.module.scss";

interface IResultCardProps {
  title: string;
  value: string;
  type?: "success" | "error";
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const ResultCard: React.FC<IResultCardProps> = ({
  type,
  title,
  value,
  icon,
  isLoading,
}) => {
  return (
    <div className={`${styles.container} ${type && styles[type]}`}>
      <div className={`${styles.header} ${type && styles[type]}`}>
        <p>{title}</p>
        {icon && <div className={styles.icon}>{icon}</div>}
      </div>
      <strong className={`${styles.value} ${type && styles[type]}`}>
        {isLoading ? <Loader size={32} /> : value}
      </strong>
    </div>
  );
};
