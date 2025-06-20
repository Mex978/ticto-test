import { CgSpinner } from "react-icons/cg";
import styles from "./styles.module.scss";

export const Loader = ({ size = 24 }: { size?: number }) => {
  return (
    <div className={styles.wrapper}>
      <CgSpinner size={size} className={`spinner ${styles.spinner}`} />
    </div>
  );
};
