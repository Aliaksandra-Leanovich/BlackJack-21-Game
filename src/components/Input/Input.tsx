import { IInputProps } from "./types";

export const Input = ({
  type,
  placeholder,
  errors,
  label,
  register,
}: IInputProps) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} {...register(label)} />
    </div>
  );
};
