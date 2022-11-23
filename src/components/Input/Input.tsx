import { IInputProps } from "./types";

export const Input = ({
  type,
  placeholder,
  errors,
  onChange,
  label,
  value,
  min,
  max,
  step,
  register,
}: IInputProps) => {
  return (
    <div>
      <input
        min={min}
        max={max}
        step={step}
        type={type}
        value={value}
        placeholder={placeholder}
        {...register}
        onChange={onChange}
      />
    </div>
  );
};
