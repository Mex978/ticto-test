import { InputHTMLAttributes } from "react";

import styles from "./styles.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export function Input({ error, ...rest }: InputProps) {
  return (
    <div className={styles.wrapper}>
      <input className={styles.field} {...rest} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
