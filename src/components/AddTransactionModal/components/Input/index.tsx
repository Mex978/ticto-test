import { InputHTMLAttributes } from "react";

import { FiAlertCircle } from "react-icons/fi";
import styles from "./styles.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ error, value, ...rest }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.field} value={value ?? ""} {...rest} />
      {error && (
        <div className={styles.errorWrapper}>
          <FiAlertCircle size={16} color="#DB3766" />
          <p className={styles.error}>{error}</p>
        </div>
      )}
    </div>
  );
}
