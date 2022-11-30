import styles from "./InputRange.module.scss";
import { IInputProps } from "./types";

export const InputRange = ({
  placeholder,
  onChange,
  value,
  min,
  max,
  step,
}: IInputProps) => {
  return (
    <div className={styles.container}>
      <input
        min={min}
        max={max}
        step={step}
        type="range"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={styles.input_range}
      />
    </div>
  );
};
