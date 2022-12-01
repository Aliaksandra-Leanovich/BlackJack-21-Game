import styles from "./Input.module.scss";
import { IInputProps } from "./types";

export const Input = ({
  type,
  placeholder,
  errors,
  onChange,
  label,
  className,
  register,
}: IInputProps) => {
  return (
    <div>
      <input
        className={`${className} ${styles.input}`}
        type={type}
        placeholder={placeholder}
        {...register(label)}
        onChange={onChange}
      />
      {errors && <p className={styles.error}>{errors.message}</p>}
    </div>
  );
};
