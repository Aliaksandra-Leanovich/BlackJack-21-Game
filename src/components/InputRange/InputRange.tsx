import styles from "./InputRange.module.scss";
import { IInputProps } from "./types";

export const InputRange = ({
  type,
  placeholder,
  onChange,
  value,
  min,
  max,
  step,
}: IInputProps) => {
  return (
    <>
      <input
        min={min}
        max={max}
        step={step}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.input_range}
      />
    </>
  );
};
