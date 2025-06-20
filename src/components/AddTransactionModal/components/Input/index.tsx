import { InputHTMLAttributes } from "react";

import styles from "./styles.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ error, value, ...rest }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.field} value={value ?? ""} {...rest} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
