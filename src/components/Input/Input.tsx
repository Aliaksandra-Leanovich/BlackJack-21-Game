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
        className={className}
        type={type}
        placeholder={placeholder}
        {...register(label)}
        onChange={onChange}
      />
    </div>
  );
};
